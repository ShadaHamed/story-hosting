"use client";
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface DeleteAStoryButtonProps {
    storyId: number;
}

const DeleteStoryButton = ({ storyId }: DeleteAStoryButtonProps) => {
    const router = useRouter();

    const deleteStoryHandler = async () => {
        try {
            if (confirm("you want to delete this story, Are you sure?")) {
                await axios.delete(`${DOMAIN}/api/stories/${storyId}`);
                router.refresh();
                toast.success("story deleted");
            }
        } catch (error: any) {
            toast.error(error?.response?.data.message);
            console.log(error);
        }
    }

    return (
        <div onClick={deleteStoryHandler} className="bg-red-600 text-white rounded-lg cursor-pointer inline-block text-center py-1 px-2 hover:bg-red-800 transition">
            Delete
        </div>
    )
}

export default DeleteStoryButton