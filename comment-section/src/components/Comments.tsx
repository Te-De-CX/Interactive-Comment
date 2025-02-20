import React, { useState } from 'react';

const Comments: React.FC = () => {
    const [activeCommentId, setActiveCommentId] = useState<number | null>(null);

    const comments = [
        {
            id: 1,
            name: "amyrobson",
            time_uploaded: "1 month ago",
            comment: "impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
            img: "/src/images/avatars/image-amyrobson.png",
            likes: 12
        },
        {
            id: 2,
            name: "maxblagun",
            time_uploaded: "2 weeks ago",
            comment: "Woah, your project looks awesome! How long have you been coding for? I'm still new. but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks",
            img: "/src/images/avatars/image-maxblagun.png",
            likes: 5
        }
    ];

    const handleReplyClick = (commentId: number) => {
        setActiveCommentId(activeCommentId === commentId ? null : commentId);
    };

    return (
        <>
            <section className='px-10 pt-5 flex flex-col gap-10'>
                {comments.map((comment) => (
                    <div key={comment.id}>
                        <div className='bg-white flex px-3 gap-5 py-5 rounded-lg'>
                            <div className='flex flex-col bg-gray-500 px-1'>
                                <button>
                                    <img src="/src/images/icon-plus.svg" alt="" />
                                </button>
                                {comment.likes}
                                <button>
                                    <img src="/src/images/icon-minus.svg" alt="" />
                                </button>
                            </div>
                            <div>
                                <div className='flex justify-between'>
                                    <div className='flex gap-5 items-center'>
                                        <img className='w-10' src={comment.img} alt="users profile" />
                                        <p>{comment.time_uploaded}</p>
                                    </div>
                                    <button className='flex items-center' onClick={() => handleReplyClick(comment.id)}>
                                        <img className='w-5 h-5' src="/src/images/icon-reply.svg" alt="reply icon" />
                                        <p>reply</p>
                                    </button>
                                </div>
                                <div>
                                    {comment.comment}
                                </div>
                            </div>
                        </div>
                        <div>
                            {activeCommentId === comment.id && "Hello World"}
                        </div>
                    </div>
                ))}
            </section>
        </>
    );
};

export default Comments;