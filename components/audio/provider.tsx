import {Beats} from "@database/models/beats";
import {createContext, ReactChild, ReactChildren, useState} from "react";

type AudioProviderProps = {children: ReactChild | ReactChildren};

export type AudioContextType = {
    selected: Beats;
    toggleAudioUrl: (track: Beats) => void;
};

export const AudioContext = createContext<AudioContextType>({
    selected: {} as Beats,
    toggleAudioUrl: () => {
        /* TODO document why this method 'toggleAudioUrl' is empty */
    },
});

export const AudioProvider = ({children}: AudioProviderProps) => {
    const [selected, setSelected] = useState<Beats>({} as Beats);

    const toggleAudioUrl = (track: Beats) => setSelected(track);

    return (
        <AudioContext.Provider value={{selected, toggleAudioUrl}}>
            {children}
        </AudioContext.Provider>
    );
};
