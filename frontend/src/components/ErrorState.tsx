type Props = {
};

export default function ErrorState({}: Props) {
    return (
        <>
            <div className="spinnerOverlay">  {/* same centered treatment */}
                <p>Could not connect to server</p>
            </div>
        </>
    );
}
