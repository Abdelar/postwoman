import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export const Error = props => {
	const handleClose = () => {
		props.clearErrorMessage();
	};

	return (
		<div>
			<Snackbar
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				open={Boolean(props.errorMessage)}
				autoHideDuration={3000}
				onClose={handleClose}
				message={props.errorMessage}
				action={
					<IconButton
						size='small'
						aria-label='close'
						color='inherit'
						onClick={handleClose}>
						<CloseIcon fontSize='small' />
					</IconButton>
				}
			/>
		</div>
	);
};
