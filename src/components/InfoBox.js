import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';

const InfoBox = ({ title, cases, total }) => {
    return (
        <Card className="infoBox">
            <CardContent>
                {/* title */}
                <Typography color="textSecondary" className="infoBox__title">
                    {title}
                </Typography>

                {/* Number of cases */}
                <h2 className="infoBox__cases">{cases}</h2>
            
                {/* 1.2M Total */}
                <Typography color="textSecondary" className="infoBox__total">
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    )
};

export default InfoBox;
