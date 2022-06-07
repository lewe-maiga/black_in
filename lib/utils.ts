export const fetcher = async (url: string) =>
    fetch(url)
        .then((res) => res.json())
        .then((json) => json);
export const cssUnitHelper = (args: string | number) =>
    typeof args === "string" ? args : `${args}px`;

export const getFileLink = (key: string) => {
    return `/api/upload/${key}`
}

export const getS3FileLink = (key: string) =>{
    return `https://black-industry.s3.eu-west-3.amazonaws.com/${key}`;
}    
