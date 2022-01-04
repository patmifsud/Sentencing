
import {InfoOutlineIcon} from '@chakra-ui/icons'

function Info(props) {

  return (
      <div className="write-info">
        <InfoOutlineIcon /> {props.text}
      </div>
     );
   }

export default Info;

