import React from 'react';
import PropTypes from 'prop-types';

const Title = props => {
    const { title, subtitle } = props;
    return (
        <>
            <div className="title-container">
               <h1>{title}</h1>
                {subtitle && <p>{subtitle}</p>}
            </div>
        </>
    );
};

Title.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
};

export default Title;
