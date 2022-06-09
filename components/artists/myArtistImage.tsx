import { Upload } from "@database/models/upload"
import { getFileLink } from "@lib/utils"
import Image from "next/image"

export type MyArtistImageProps = {
    image: Upload
}

export const MyArtistImage = ({image}: MyArtistImageProps ) => {
    return(
        <>
            <Image
                src={getFileLink(image.key)}
                alt={`${image.name}`}
                objectFit="cover"
                layout="fill"
            />
        </>
    )
}