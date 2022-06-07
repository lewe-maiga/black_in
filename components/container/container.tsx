import {useAudioContext} from "@components/audio/hooks";
import {Player} from "@components/audio/player";
import {cssUnitHelper} from "@lib/utils";
import {ReactChild, ReactChildren} from "react";

type ContainerProps = {
    width?: string | number;
    height?: string | number;
    children: ReactChild | ReactChildren | ReactChild[] | ReactChildren[];
};

export const Container = ({
    children,
    height = "100%",
    width = "100%",
}: ContainerProps) => {
    const sizeHeight = cssUnitHelper(height);
    const sizeWidth = cssUnitHelper(width);
    const {selected} = useAudioContext();
    return (
        <>
            <div className="container">
                {Object.keys(selected).length !== 0 && (
                    <Player track={selected} />
                )}
                <main>{children}</main>
            </div>

            <style jsx>
                {`
                    div.container {
                        height: ${sizeHeight};
                        width: ${sizeWidth};
                        display: flex;
                        padding: 1rem;
                        padding-bottom: 0;
                        flex-direction: column;
                    }

                    @media only screen and (min-width: 1000px) {
                        div.container {
                            padding: 1rem 3.75rem;
                        }
                    }
                    @media only screen and (min-width: 2000px) {
                        div.container {
                            padding: 1rem 15rem;
                        }
                    }
                `}
            </style>
        </>
    );
};
