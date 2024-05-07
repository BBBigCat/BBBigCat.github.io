import { defineDocumentType, makeSource } from '@contentlayer/source-files';
import rehypeImgSize from 'rehype-img-size';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkExternalLinks from 'remark-external-links';
import remarkGfm from 'remark-gfm';

export const Blog = defineDocumentType(() => ({
    name: 'Blog',
    filePathPattern: './blog/**.md',
    contentType: 'mdx',
    fields: {
        title: {
            type: 'string',
            required: true,
        },
        date: {
            type: 'string',
            required: true,
        },
        description: {
            type: 'string',
            required: true,
        },
        tags: {
            type: 'list',
            of: {
                type: 'string',
            },
            required: true,
        },
    },
    computedFields: {
        url: {
            type: 'string',
            resolve: blog => `blog/${blog._raw.sourceFileName.replace('.md', '')}`,
        },
        slug: {
            type: 'string',
            resolve: blog => blog._raw.sourceFileName.replace('.md', ''),
        },
    },
}));

export default makeSource({
    contentDirPath: './content',
    documentTypes: [Blog],
    mdx: {
        rehypePlugins: [
            // @ts-ignore
            [rehypePrettyCode, { theme: 'github-dark' }],
            // @ts-ignore
            [rehypeImgSize, { dir: 'public' }],
        ],
        remarkPlugins: [remarkGfm, remarkExternalLinks],
    },
});
