import { format, parseISO } from 'date-fns';
import { Post } from 'contentlayer/generated';
import Link from 'next/link';
import { calculateReadingTime } from '@/lib/helpers';

export function PostCard(post: Post) {
  return (
    <Link href={post.url} className='block h-full'>
      <article className='h-full rounded-lg border border-transparent bg-white/5 p-4 text-start backdrop-blur-lg backdrop-saturate-[1.8] transition-colors hover:border-default-200 dark:bg-default-400/10'>
        {post.image ? (
          <img
            className='mb-4 aspect-square w-full rounded-md object-cover'
            src={post.image}
            alt={post.description}
            height={400}
            width={400}
          />
        ) : null}
        <h3 className='mt-3 text-3xl font-bold'>{post.title}</h3>
        <p className='w-full font-normal text-default-600'>
          {post.description}
        </p>
        <footer className='mt-4 flex items-center justify-between gap-4'>
          <div className='flex flex-wrap gap-x-5 gap-y-1 text-small text-default-500'>
            <time
              className='block'
              dateTime={post.date}
              suppressHydrationWarning
            >
              {format(parseISO(post.date), 'LLLL d, yyyy')}
            </time>
            <p>{calculateReadingTime(post.body.raw)} min read</p>
          </div>
          {post.author?.avatar ? (
            <img
              alt=''
              className='h-8 w-8 shrink-0 rounded-full object-cover'
              src={post.author.avatar}
            />
          ) : null}
        </footer>
      </article>
    </Link>
  );
}
