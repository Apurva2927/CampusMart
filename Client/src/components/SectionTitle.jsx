import React from 'react';

export default function SectionTitle({ text1, text2, text3 }) {
    return (
        <div className="section-title">
            <p className="section-title__eyebrow">{text1}</p>
            <h3 className="section-title__heading">{text2}</h3>
            <p className="section-title__copy">{text3}</p>
        </div>
    );
}