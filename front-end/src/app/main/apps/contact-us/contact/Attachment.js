import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';

const Root = styled('div')({
  fontSize: 13,
  backgroundColor: 'rgba(0, 0, 0, 0.08)',
  border: '1px solid rgba(0, 0, 0, 0.16)',
  paddingLeft: 16,
  marginBottom: 8,
  borderRadius: 2,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  '& .filename': {
    fontWeight: 600,
  },
  '& .size': {
    marginLeft: 8,
    fontWeight: 300,
  },
});

function Attachment(props) {

  function remove() {
    props.onRemove();
  }
  return (
    <Root className={props.className}>
      <div className="flex">
        <Typography variant="caption" className="filename">
          {props.file.name}
        </Typography>
        <Typography variant="caption" className="size">
          ({props.file.size})
        </Typography>
      </div>
      <IconButton size="large" onClick={remove}>
        <FuseSvgIcon size={16}>heroicons-outline:x</FuseSvgIcon>
      </IconButton>
    </Root>
  );
}

export default Attachment;
