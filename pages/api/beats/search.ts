import Beats from "@database/models/beats";
import {NextApiRequest, NextApiResponse} from "next";

const search = async (req: NextApiRequest, res: NextApiResponse) => {
    const {text} = req.query;
    const title = text as string;
    Beats.find({title: {$regex: title, $options: "i"}, published: true})
        .then((beats) => res.status(200).json({beats}))
        .catch((error) => res.status(500).json({error}));
};

export default search;
