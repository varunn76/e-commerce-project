"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteModalProps {
  title?: string;
  description?: string;
  onConfirm: () => void;
  trigger: React.ReactNode;
}
const DeleteModal = ({
  title = "Delete Item",
  description = "Are you sure you want to delete this item?",
  onConfirm,
  trigger,
}: DeleteModalProps) => {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-lg">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

               <div className="flex justify-center md:justify-end  gap-3 pt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button
            variant="destructive"
            className="px-3 bg-red-400 hover:bg-red-500 cursor-pointer h-8 text-sm"
            onClick={handleConfirm}
          >
            Yes, Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
