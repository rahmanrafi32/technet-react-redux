import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { FiSend } from 'react-icons/fi';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useGetCommentsQuery, usePostCommentMutation } from '@/redux/features/product/productApi.ts';

interface IProps {
  id: string
}
export default function ProductReview({id}:IProps) {
  const [inputValue, setInputValue] = useState<string>('')
  const {data: comments} = useGetCommentsQuery(id)
  const [postComment] = usePostCommentMutation()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const options = {
      id,
      data: {comment: inputValue}
    }
    postComment(options)
  };
  const handleChange = ({ target }: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(target.value)
  };

  return (
    <div className="max-w-7xl mx-auto mt-5">
      <form className="flex gap-5 items-center" onSubmit={handleSubmit}>
        <Textarea
          className="min-h-[30px]"
          onChange={handleChange}
          value={inputValue}
        />
        <Button
          type="submit"
          className="rounded-full h-10 w-10 p-2 text-[25px]"
        >
          <FiSend />
        </Button>
      </form>
      <div className="mt-10">
        {comments?.comments?.map((comment: string, index: number) => (
          <div key={index} className="flex gap-3 items-center mb-5">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p>{comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
