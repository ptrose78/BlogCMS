
'use client';

import { deletePost } from "@/app/lib/data";
import { updatePost } from "@/app/lib/data";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { fetchPosts } from "@/app/lib/data";

interface Post {
    id?: number;
    title?: string;
    content?: string; 
    featured?: boolean;
    archived?: boolean;
}

export default function PostList({  }) {
    
    const[notification, setNotification] = useState<string>("");

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getPosts = async () => {
            const data = await fetchPosts();
            setPosts(data);
        };

        getPosts();
    }, []);

    async function handleDelete(post) {
        try {
            await deletePost(post);
            setNotification("Deleted successfully!");
            setPosts((prevPosts) => prevPosts.filter((p) => p.id !== post.id));
            setTimeout(()=>setNotification(""), 3000);
            // Optionally, refresh the page or state
            // window.location.reload(); // Refresh the page after deletion
        } catch (error) {
            setNotification("Failed to Delete. Try again.")
            setTimeout(()=>setNotification(""), 3000);
            console.error("Failed to delete post:", error);
            alert("An error occurred while deleting the post.");
        }
    }

    async function handleArchive(post, isArchived) {
        try {
            await updatePost(post.id, {...post, archived: isArchived});
            setNotification("Archived successfully!")
            setTimeout(()=>setNotification(""), 3000);
            setPosts((prevPosts) =>
                prevPosts.map((p)=>
                    p.id === post.id ? {...p, archived: isArchived} : p
                )
            )
        } catch(error) {
            setNotification("Failed to Archive. Try again.")
            setTimeout(()=>setNotification(""), 3000);
            console.error("Database error:", error);
            throw new Error("Failed to update the post's archive status.")
        }
    }

    async function handleFeature(post, isFeatured) {
        try {
            updatePost(post.id, {...post, featured: isFeatured})
            setNotification("Featured successfully!")
            setTimeout(()=>setNotification(""), 3000);
            setPosts((prevPosts)=>
                prevPosts.map((p)=>
                    p.id === post.id ? {...p, featured: isFeatured} : p
                )
            )
        } catch(error) {
            setNotification("Failed to Feature. Try again.")
            setTimeout(()=>setNotification(""), 3000);
            console.error("Database error:", error);
            throw new Error("Failed to update the post's feature status")
        }
    }

    if (posts.length === 0) {
        return <div>Loading posts...</div>;
    }

    return (
        <div>
            <div>
                {notification && (
                     <div className="fixed top-15 mb-8 right-18 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-md shadow-lg">
                        {notification}
                    </div>
                )}
            </div>
            <h1 className="text-2xl font-semibold mb-4">Existing Post Titles</h1>
            {posts.map((post) => (
                <li
                    key={post.id}
                    className="list-none ml-2 pb-3 rounded-lg transition-transform"
                >
                    <Link
                        href={`/admin/blog/${post.id}`}
                        className="text-blue-600 font-medium underline hover:no-underline hover:text-blue-800 cursor-pointer"
                    >
                        {post.featured ? `*${post.title}` : post.title}
                    </Link>
                    <button
                        className="ml-2 mr-2 bg-red-600 hover:bg-red-700 rounded-lg pl-1 pr-1 p-0.5 text-white text-sm"
                        onClick={() => handleDelete(post)}
                    >
                        X
                    </button>
                    <div>
                        <label className="mr-1 text-sm font-medium text-gray-700">Featured</label>
                        <input
                            type="checkbox"
                            name="archived"
                            checked={post.featured}
                            className="mt-1 mr-2.5"
                            onChange={(e) => handleFeature(post, e.target.checked)}
                        />
                        <label className="mr-1 text-sm font-medium text-gray-700">Archived</label>
                        <input
                            type="checkbox"
                            name="archived"
                            checked={post.archived}
                            className="mt-1"
                            onChange={(e) => handleArchive(post, e.target.checked)}
                        />
                    </div>
                </li>
            ))}
        </div>
    );
}
