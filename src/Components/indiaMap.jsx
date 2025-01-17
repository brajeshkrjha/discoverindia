import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-use-history';
import IndiaMap from '@svg-maps/india';
import { SVGMap } from 'react-svg-map';
import 'react-svg-map/lib/index.css';

const Map = () => {
    const [selectedState, setSelectedState] = useState(null);
    const mapContainerRef = useRef(null);
    const history = useHistory();

    const handleLocationClick = (event) => {
        const stateName = event.target.attributes.name?.value;
        if (stateName) {
            setSelectedState(stateName);
            const formattedStateName = stateName.toLowerCase().replace(/\s+/g, '');
            history.push(`/state/${encodeURIComponent(formattedStateName)}`);
        } else {
            console.error('State name is undefined or not found');
        }
    };

    const handleClickOutside = (event) => {
        if (mapContainerRef.current && !mapContainerRef.current.contains(event.target)) {
            setSelectedState(null);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    return (
        <div ref={mapContainerRef} className="relative">
            <SVGMap
                map={IndiaMap}
                className="w-full h-auto stroke-black stroke-1"
                onLocationClick={handleLocationClick}
                customize={{
                    Bihar: {
                        fill: "red",
                        stroke: "#000",
                        strokeWidth: 1
                    }
                }}
            />
        </div>
    );
};

export default Map;
