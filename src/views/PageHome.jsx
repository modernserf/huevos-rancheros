"use strict";

import React        from 'react';
import GlobalAtom   from 'mixins/GlobalAtom';
import PageBase from 'views/PageBase';
import {Flex,FlexBox} from 'views/FlexBox';
import {colors, fonts} from 'views/style';


var PageHome = React.createClass({
    mixins: [GlobalAtom],
    propTypes: {},
    render (){
        return (
            <PageBase image="img-placeholder/huevos-rancheros-overhead.jpg">
                <FlexBox direction="column"
                    justifyContent="center"
                    style={{height:"100%"}}>
                    <Flex>
                        <h2 style={Object.assign({
                            color: colors.gold,
                            textAlign: "center",
                            fontSize: 24,
                            textShadow: `black 1px 1px`,
                            marginTop: -24
                        },fonts.hedLight)}>Beyond Documents with D3, React, and</h2>
                        <h1 style={Object.assign({
                            color: colors.gold,
                            textAlign: "center",
                            fontSize: 96,
                            textTransform: "uppercase",
                            textShadow: `${colors.red} 1px 4px`   
                        },fonts.hedHeavy)}>Huevos Rancheros</h1>
                    </Flex>
                </FlexBox>
            </PageBase>
        );
    }
});

export default PageHome;
