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
                        <h1 style={Object.assign({
                            color: colors.gold,
                            textAlign: "left",
                            fontSize: 126,
                            textTransform: "uppercase",
                            textShadow: `${colors.red} 1px 4px`
                        },fonts.hedHeavy)}>How to Draw an <br/>
                            <span style={{fontSize: 200}}>egg</span></h1>
                        <h2 style={Object.assign({
                            color: colors.gold,
                            textAlign: "left",
                            fontSize: 48,
                            textShadow: `${colors.red} 1px 1px`,
                            // marginTop: -24
                        },fonts.hedLight)}>(the hard way)</h2>

                    </Flex>
                </FlexBox>
            </PageBase>
        );
    }
});

export default PageHome;
