import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useState } from "react"

export function DeleteMessage({isOpen, messageId, onDelete, onClose, isSender, senderID, receiverID}) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState("")

  const handleDelete = async () => {
    if (!isSender) {
      setError("Only the sender can delete this message")
      return
    }

    setIsDeleting(true)
    setError("")
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(
        `http://localhost:3000/api/v1/Message/${messageId}/${senderID}/${receiverID}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      )

      const responseData = await response.json()

      if (response.ok) {
        onDelete(messageId)
        onClose()
      } else {
        setError(responseData.message || "Failed to delete message")
        console.error("Failed to delete message:", response.status, responseData)
      }
    } catch (error) {
      setError("Error deleting message")
      console.error("Error deleting message:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Message?</AlertDialogTitle>
          <AlertDialogDescription>
            {!isSender 
              ? "Only the sender can delete this message." 
              : "This action cannot be undone. This will permanently delete this message."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        {error && (
          <div className="text-red-500 text-sm px-4 py-2 bg-red-50 rounded">
            {error}
          </div>
        )}
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          {isSender && (
            <AlertDialogAction 
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
