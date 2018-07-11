import { IProfile } from "../redux/actions/profile";

const ViewProfile = async (battletag: string, platform: string): Promise<IProfile> => {
    const profile = await fetch(`${BUILDCONFIG.apiUrl}/json/${platform}/${battletag.replace("#", "-")}`).catch((err) => {
        throw new Error("A network error happened while requesting");
    });

    const profileJSON: IProfile = await profile.json();

    switch (profileJSON.error) {
        case "User does not exist!": {
            throw new Error("User does not exist");
        }
    }

    return profileJSON;
};

export default ViewProfile;
