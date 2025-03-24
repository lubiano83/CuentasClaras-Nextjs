import ProfileList from "@/app/components/profile/ProfileList";

export default function ProfilePage({ params }) {

    const id = params;

    return (
        <>
            <ProfileList id={id} />
        </>
    )
};