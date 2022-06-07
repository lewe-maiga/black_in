import {NeastedLayout} from "@components/admin/nested-layout";
import {ReactElement} from "react";

type DashboardProps = {};

const Dashboard = ({}: DashboardProps) => {
    return (
        <>
            <div></div>

            <style jsx>{``}</style>
        </>
    );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
    return (
        <>
            <NeastedLayout>
                <>{page}</>
            </NeastedLayout>
        </>
    );
};

export default Dashboard;
