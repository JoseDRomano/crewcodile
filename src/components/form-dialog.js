import * as React from 'react';

import Dialog from '@mui/material/Dialog';
import {useDialog} from '../contexts/dialog-context';

export default function FormDialog({children}) {

    const dialog = useDialog();

    return (
        <React.Fragment>
            <Dialog open={dialog.open}
                    onClose={dialog.closeDialog}>
                {children}
            </Dialog>
        </React.Fragment>
    );
}