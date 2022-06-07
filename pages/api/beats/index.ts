import {dbConnect} from "@database/mongodb";
import Beats, {Beats as Beat} from "@database/models/beats";
import {NextApiRequest, NextApiResponse} from "next";
import {auth} from "@lib/middleware/auth";

const beatsRoutes = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await dbConnect();

        switch (req.method) {
            case "POST": {
                await auth(req, res);
                const createBeat = new Beats({
                    ...req.body,
                });
                await createBeat.save().then((beat: Beat) => {
                    res.status(200).json({beat});
                });
                break;
            }
            case "DELETE": {
                await auth(req, res);
                const {_ids: _id} = req.body;

                await Beats.deleteMany({
                    _id: {
                        $in: [..._id],
                    },
                });
                await Beats.find().then((beats: Beat[]) =>
                    res.status(200).json({beats})
                );
                break;
            }
            case "GET": {
                const {limit} = req.query;
                const limitValue =
                    typeof limit === "string" ? parseInt(limit) : 0;
                delete req.query["limit"];
                if (Object.entries(req.query).length > 0) {
                    Object.entries(req.query).forEach(([key]) => {
                        switch (key) {
                            case "new":
                                return Beats.find({published: {$eq: true}})
                                    .sort({created_at: -1})
                                    .limit(limitValue)
                                    .then((beats: Beat[]) =>
                                        res.status(200).json({beats})
                                    );

                            case "best":
                                return Beats.find({published: {$eq: true}})
                                    .sort({view: -1})
                                    .limit(limitValue)
                                    .then((beats: Beat[]) =>
                                        res.status(200).json({beats})
                                    );
                            case "soon":
                                return Beats.find({published: {$ne: true}})
                                    .limit(limitValue)
                                    .then((beats: Beat[]) =>
                                        res.status(200).json({beats})
                                    );
                            case "all":
                                return Beats.find()
                                    .limit(limitValue)
                                    .then((beats: Beat[]) =>
                                        res.status(200).json({beats})
                                    );
                            default:
                                break;
                        }
                    });
                } else {
                    Beats.find({published: {$eq: true}})
                        .limit(limitValue)
                        .then((beats: Beat[]) => res.status(200).json({beats}));
                }

                break;
            }
            default:
                res.status(500).json({msg: "request not defined"});
                break;
        }
    } catch (error) {
        res.status(500).json({error});
    }
};

export default beatsRoutes;
