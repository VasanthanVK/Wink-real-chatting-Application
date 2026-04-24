import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import toast from "react-hot-toast"

export function ProfileEdit() {
     const [open, setOpen] = useState(false);
     const [profileImage, setProfileImage] = useState(null);
     const [loading, setLoading] = useState(false);
     const user = JSON.parse(localStorage.getItem("user"));
     const token = localStorage.getItem("token");
     const userid = user._id;
     
     const [preview, setPreview] = useState(null);
     const [name, setName] = useState("");
     const [textarea, setTextarea] = useState("");

     const handleImageChange = (e) => {
       const file = e.target.files[0];
       if (file) {
         if (preview) URL.revokeObjectURL(preview);
         setProfileImage(file);
         setPreview(URL.createObjectURL(file));
       }
     };

     const handleSubmit = async (e) => {
       e.preventDefault();
       
       // Validation
       if (!name.trim() && !textarea.trim() && !profileImage) {
         toast.error("Please fill at least one field to update");
         return;
       }

       if (name.trim() && (name.length < 3 || name.length > 15)) {
         toast.error("Name must be between 3 and 15 characters");
         return;
       }

       if (textarea.trim() && (textarea.length < 5 || textarea.length > 100)) {
         toast.error("Bio must be between 5 and 100 characters");
         return;
       }

       try {
         setLoading(true);
         const formData = new FormData();
         
         if (name.trim()) formData.append("Name", name);
         if (textarea.trim()) formData.append("Bio", textarea);
         if (profileImage) formData.append("profilePic", profileImage);

         const response = await fetch(`http://localhost:3000/api/v1/updateProfile/${userid}`, {
           method: "PUT",
           headers: {
             Authorization: token
           },
           body: formData,
         });

         const data = await response.json();

         if (!response.ok) {
           toast.error(data.message || "Failed to update profile");
           return;
         }

         // Update localStorage with new user data
         localStorage.setItem("user", JSON.stringify(data.user));
         toast.success(data.message || "Profile updated successfully");
         
         // Reset form
         setName("");
         setTextarea("");
         setProfileImage(null);
         setPreview(null);
         setOpen(false);
       } catch (error) {
         console.error("Error updating profile:", error);
         toast.error("Server error. Please try again.");
       } finally {
         setLoading(false);
       }
     }


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form onSubmit={handleSubmit}>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <label className="cursor-pointer flex justify-center items-center">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-500 shadow-lg">
                  <img
                    src={
                      preview
                        ? preview
                        : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </Field>
            <Field>
              <Label htmlFor="Name">Name</Label>
              <Input
                id="Name"
                name="Name"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Field>
            <Field>
              <Label htmlFor="Bio">Bio</Label>
              <Input
                id="Bio"
                name="Bio"
                placeholder="Your bio"
                value={textarea}
                onChange={(e) => setTextarea(e.target.value)}
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={loading} onClick={handleSubmit}>
              {loading ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
