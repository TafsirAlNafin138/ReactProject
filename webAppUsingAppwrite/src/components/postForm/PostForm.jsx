import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { RTE, Input, Select, Button } from "../index";
import appwriteService from "../../appwrite/database";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, watch, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
        // category: post?.category || "general"
      },
    });
  const userData = useSelector((state) => state.user.userData);
  const submit = async (data) => {
    if (post && post.$id) {
      const file = data.image[0]
        ? appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        appwriteService.deleteFile(post.featureImageId);
      }

      const updatedPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featureImageId: file ? file.$id : post.featureImageId,
      });
      if (updatedPost) {
        navigate(`/post/${updatedPost.$id}`);
      }
    } else {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;
      const newPost = await appwriteService.createPost({
        ...data,
        userId: userData.$id,
        featureImageId: file ? file.$id : null,
      });
      if (newPost) {
        navigate(`/post/${newPost.$id}`);
      }
    }

    const slugTransform = useCallback((value) => {
      if (!value || typeof value !== "string") return "";
      return value
        .trim()
        .toLowerCase()
        .replace(/^[a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }, []);

    React.useEffect(() => {
      const subription = watch((value, { name }) => {
        if (name === "title") {
          const slug = slugTransform(value.title, { shouldvalidate: true });
          setValue("slug", slug);
        }
      });
      return () => subription.unsubscribe(); // Cleanup subscription on unmount for memory leak prevention
    }, [watch, slugTransform, setValue]);
  };
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <form onSubmit={handleSubmit(submit)} className="space-y-6">
        <Input
          label="Title"
          type="text"
          placeholder="Enter post title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug"
          type="text"
          placeholder="Enter post slug"
          className="mb-4"
          {...register("slug", { required: true })}
          OnInput={(e) => {
            const slug = slugTransform(e.target.value, {
              shouldvalidate: true,
            });
            setValue("slug", slug);
          }}
        />
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Content
          </label>
          <RTE
            control={control}
            name="content"
            defaultValue={getValues("content")}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Feature Image
          </label>
          <input
            type="file"
            accept="image/*"
            {...register("image", { required: !post })}
          />

          {post && (
            <div className="w-full mb-4 mt-2">
              <img
                src={appwriteService.getFilePreviewURL(post.featureImageId)}
                alt={post.title}
                className="max-w-full h-auto rounded"
              />
            </div>
          )}
        </div>

        <div>
          <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4"
            {...register("status", { required: true })}
          />
          <Button
            type="submit"
            bgColor={post ? "bg-green-500" : "bg-red-500"}
            className="w-full"
          >
            {post ? "Update Post" : "Create Post"}
          </Button>
        </div>
      </form>
    </div>
  );
}
