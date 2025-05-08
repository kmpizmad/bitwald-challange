'use client';

import { useRef } from 'react';

import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

type Comment = {
  id: number;
  comment: string;
  createdAt: number;
};

export type CommentSectionProps = {
  comments: Comment[];
  onComment?: (comment: string) => void;
};

export function CommentSection({ comments, onComment }: CommentSectionProps) {
  const commentRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div>
      <div className="font-bold mb-1">COMMENTS</div>
      <div className="space-y-2">
        {comments.map(comment => (
          <div key={`comment-${comment.id}`} className="px-6 py-4 border border-gray-200 rounded-md">
            <div className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleString()}</div>
            <div>{comment.comment}</div>
          </div>
        ))}
        <div className="space-y-3">
          <Textarea ref={commentRef} className="w-full" placeholder="Type your comment here..." />
          <Button
            variant="default"
            onClick={() => {
              if (!commentRef.current) return;
              if (onComment) onComment(commentRef.current.value);
              commentRef.current.value = '';
            }}
          >
            Comment
          </Button>
        </div>
      </div>
    </div>
  );
}
