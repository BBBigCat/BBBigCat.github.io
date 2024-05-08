import { allBlogs } from 'contentlayer/generated';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { Metadata } from 'next';
import { Lato } from 'next/font/google';

import List from '../components/List';

dayjs.extend(isSameOrAfter);

const font = Lato({
    weight: '700',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: `Blog`,
};

export default async function Page() {
    // @ts-ignore
    const blogList = allBlogs.sort((a, b) => (dayjs(b.date).isSameOrAfter(dayjs(a.date)) ? 1 : -1));

    return (
        <>
            <div className="pt-10 pb-6 px-3">
                <h1 className={`flex flex-col text-3xl text-black leading-normal tracking-wider ${font.className}`}>
                    博客 / Blog
                </h1>
            </div>
            <List data={blogList} />
        </>
    );
}
