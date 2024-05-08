import { useMDXComponent } from 'next-contentlayer/hooks';
import Image from 'next/image';
import { FC } from 'react';

export interface MDXProps {
    code: string;
}

const MDX: FC<MDXProps> = ({ code }) => {
    const Component = useMDXComponent(code);

    return <Component components={{ img: (props: any) => <Image {...props} /> }} />;
};

export default MDX;
