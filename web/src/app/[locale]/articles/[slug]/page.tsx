import { format, parseISO } from 'date-fns';
import { allPosts } from 'contentlayer/generated';
import { ChevronRightLinearIcon } from '@/components/icons';
import NextLink from 'next/link';
import { calculateReadingTime } from '@/lib/helpers';
import { ViewCounter } from '@/components/view-counter';
import { Suspense } from 'react';

export const generateStaticParams = async () =>
  allPosts.map((post) => ({ slug: post._raw.flattenedPath }));

export const generateMetadata = async ({
  params
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const post = allPosts.find((post) => post._raw.flattenedPath === slug);
  if (!post) throw new Error(`Post not found for slug: ${slug}`);
  return { title: post.title };
};

const PostLayout = async ({
  params
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const post = allPosts.find((post) => post._raw.flattenedPath === slug);
  if (!post) throw new Error(`Post not found for slug: ${slug}`);
  return (
    <article className='w-full flex flex-col justify-start items-center prose prose-neutral'>
      <div className='w-full max-w-4xl'>
        <div className='flex'>
          <div className='flex grow'>
            <NextLink
              className='text-default-500 hover:text-default-900 justify-start mb-2'
              href='/articles'
            >
              <ChevronRightLinearIcon
                className='rotate-180 inline-block mr-1'
                size={15}
              />
              Back to articles
            </NextLink>
          </div>
          <div>
            <div className='mb-3 flex w-full items-center gap-3 text-right'>
              {post.author?.avatar && (
                <img
                  src={post.author.avatar}
                  alt={post.author?.name || 'Article author'}
                  className='h-10 w-10 rounded-full object-cover'
                />
              )}
              <div>
                <p className='font-medium'>{post.author?.name}</p>
                <p className='text-small text-default-500'>
                  {post.author?.username}
                </p>
              </div>
            </div>
          </div>
        </div>
        {post.image && (
          <div className='relative w-full'>
            <img
              src={post.image}
              alt={post.title}
              className='mb-4 w-full object-cover'
            />
            <div className='absolute inset-0 flex md:mt-8 mt-2 mx-2 md:mx-4'>
              <div className='bg-foreground px-4 py-2 z-10 h-fit rounded'>
                <h1 className='lg:text-5xl md:text-4xl text-xl font-bold z-20 text-background'>
                  {post.title}
                </h1>
              </div>
            </div>
          </div>
        )}
        <div className='flex justify-between text-small mb-2 text-default-500 w-full'>
          <p>{calculateReadingTime(post.body.raw)} min read</p>
          <Suspense>
            <ViewCounter postId={post._id} />
          </Suspense>
          <time dateTime={post.date}>
            {format(parseISO(post.date), 'LLLL d, yyyy')}
          </time>
        </div>
        <div
          className='[&>*]:mb-3 [&>*:last-child]:mb-0 articlePage'
          dangerouslySetInnerHTML={{ __html: post.body.html }}
        />
      </div>
    </article>
  );
};

export default PostLayout;
