import React, { useEffect  } from 'react';

const AdsComponent = (props:any) => {
    const { dataAdSlot } = props;  



    useEffect(() => {

        try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        }

        catch (e) {

        }

    },[]);



    return (
        <>
            <ins className="adsbygoogle"
                style={{ display: "block", "width": "360px", "height": "90px !important" }}
                data-ad-client="ca-pub-9828783530326542"
                data-ad-slot={dataAdSlot}
                data-ad-format="auto"
                data-full-width-responsive="true">
            </ins>
        </>
    );
};

export default AdsComponent;
