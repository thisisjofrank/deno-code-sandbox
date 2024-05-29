import React from 'react';

// This component is used to display the deployment URL along
// with an iframe to preview the deployed project.

export type Props = { url: string, status: string };
export default function DeploymentViewer(props: Props) {
    const { url, status } = props;

    const showPreview = url && status === 'success';

    const notReady = (<div>{status}</div>);
    const preview = (
        <div>
            <div className="url"><a href={url}>{url}</a></div>
            <iframe src={url} title="sandbox" className="sandbox" />
        </div>
    );

    return showPreview ? preview : notReady;
}
