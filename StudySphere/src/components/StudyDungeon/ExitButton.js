import React from 'react';
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  position: 'fixed',
  top: theme.spacing(2),
  right: theme.spacing(2),
  color: '#fff',
  background: 'rgba(0, 0, 0, 0.5)',
  backdropFilter: 'blur(10px)',
  '&:hover': {
    background: 'rgba(244, 67, 54, 0.8)',
  },
}));

const ExitButton = ({ onExit }) => {
  const [showConfirm, setShowConfirm] = React.useState(false);

  const handleClick = () => {
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    onExit();
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  return (
    <>
      <StyledIconButton onClick={handleClick}>
        <ExitToApp />
      </StyledIconButton>

      <Dialog
        open={showConfirm}
        onClose={handleCancel}
        PaperProps={{
          style: {
            background: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(76, 170, 255, 0.3)',
            color: '#fff',
          },
        }}
      >
        <DialogTitle>Exit Game?</DialogTitle>
        <DialogContent>
          Are you sure you want to exit? Your progress will be saved.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="error">
            Exit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ExitButton; 