import { parkingSections } from '../../../config/parkingLot/parkingSections';

import ParkingSection from './ParkingSection';

export default function ParkingSections() {
    return(<>
        {
            parkingSections.map((item, idx) => {
                return(<ParkingSection key={idx} parkingSectionInfo={item} />);
            })
        }
    </>);
}