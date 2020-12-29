import React from 'react';
import "./Infobox.css";
import { Card, CardContent, Typography } from '@material-ui/core';
import { prettyPrintCases, prettyPrintTotal } from "./util";

function Infobox({ title, value, active, cases, total, ...props }) {
    cases = prettyPrintCases(cases);
    total = prettyPrintTotal(total);

    return (
        <Card onClick={props.onClick} className={`infobox ${value} ${active && 'infobox--selected'}`}>
            <CardContent className="infobox__content">
                <Typography className='infobox__title' color='textSecondary'>
                    {title}
                </Typography>

                <h2 className='infobox__cases'>{cases}</h2>

                <Typography className='infobox__total' color='textSecondary'>
                    Total<br />{total}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Infobox
