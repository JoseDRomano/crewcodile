import Image from 'next/image'

export const Logo = () => {

    return (
        <Image
            src="/logo2.png"
            width={150}
            height={100}
            alt="CrewCodile Logo"
        />
    );
};