
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, MessageSquare } from "lucide-react";

interface ForumPost {
  id: number;
  title: string;
  content: string;
  author: string;
  type: "sell" | "buy" | "give";
  price?: string;
  createdAt: string;
}

const ForumSection = () => {
  const [posts, setPosts] = useState<ForumPost[]>([
    {
      id: 1,
      title: "Coffee Table for Sale",
      content: "Beautiful wooden coffee table, lightly used. Perfect for any living room!",
      author: "Sarah M.",
      type: "sell",
      price: "$75",
      createdAt: "2 days ago"
    },
    {
      id: 2,
      title: "Looking for: Bicycle",
      content: "Need a reliable bike for commuting. Willing to pay fair price for good condition.",
      author: "Mike R.",
      type: "buy",
      createdAt: "1 week ago"
    },
    {
      id: 3,
      title: "Free: Kitchen Items",
      content: "Moving out next month, have extra plates, cups, and utensils to give away.",
      author: "Jenny L.",
      type: "give",
      createdAt: "3 days ago"
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    type: "sell" as "sell" | "buy" | "give",
    price: ""
  });

  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const post: ForumPost = {
      id: posts.length + 1,
      title: newPost.title,
      content: newPost.content,
      author: "You",
      type: newPost.type,
      price: newPost.price || undefined,
      createdAt: "Just now"
    };

    setPosts([post, ...posts]);
    setNewPost({ title: "", content: "", type: "sell", price: "" });
    setShowForm(false);
    
    toast({
      title: "Post Created!",
      description: "Your post has been added to the forum.",
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "sell": return "bg-green-100 text-green-800";
      case "buy": return "bg-blue-100 text-blue-800";
      case "give": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Buy & Sell Forum</h3>
          <p className="text-gray-600">Share items you want to sell, buy, or give away with the community</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Post</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newPost.title}
                  onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                  placeholder="What are you selling/buying/giving away?"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="type">Type</Label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={newPost.type}
                  onChange={(e) => setNewPost({...newPost, type: e.target.value as "sell" | "buy" | "give"})}
                >
                  <option value="sell">Selling</option>
                  <option value="buy">Looking to Buy</option>
                  <option value="give">Giving Away</option>
                </select>
              </div>

              {(newPost.type === "sell" || newPost.type === "buy") && (
                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    value={newPost.price}
                    onChange={(e) => setNewPost({...newPost, price: e.target.value})}
                    placeholder="$0.00"
                  />
                </div>
              )}

              <div>
                <Label htmlFor="content">Description</Label>
                <Textarea
                  id="content"
                  value={newPost.content}
                  onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                  rows={3}
                  required
                />
              </div>

              <div className="flex space-x-2">
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  Create Post
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {posts.map((post) => (
          <Card key={post.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{post.title}</CardTitle>
                  <CardDescription className="flex items-center mt-2">
                    <span>by {post.author}</span>
                    <span className="mx-2">•</span>
                    <span>{post.createdAt}</span>
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getTypeColor(post.type)}>
                    {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
                  </Badge>
                  {post.price && (
                    <Badge variant="outline" className="font-semibold">
                      {post.price}
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{post.content}</p>
              <div className="mt-4 flex items-center text-sm text-gray-500">
                <MessageSquare className="h-4 w-4 mr-1" />
                <span>Click to contact seller</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ForumSection;
