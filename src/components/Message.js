import React from 'react';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

function Message({ variant, children, onClose }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Alert
        icon={false}
        severity={variant}
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: '5%',
          marginBottom: '15px',
          '& .MuiAlert-message': { 
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
          },
          '& .MuiAlert-action': { 
            marginLeft: 'auto',
          },
        }}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={onClose}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        <Typography variant="body2" style={{ alignSelf: 'center' }}>
          {children}
        </Typography>
      </Alert>
    </div>
  );
}

export default Message;
