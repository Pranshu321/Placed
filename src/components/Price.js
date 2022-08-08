import React from 'react'
import './Price.css';

const Price = () => {
    return (
        <>
            <div class="container">
                <div class="grid">
                    <div class="card">
                        <h2 class="card_title">Student</h2>
                        <p class="pricing">₹Free<span class="small"></span></p>
                        <ul class="features">
                            <li>6-7 Days Processing Period</li>
                            <li>Unlimited Job Apply Chances</li>
                            <li>Customized Dashboard</li>
                        </ul>
                        <a href="#" class="cta_btn" style={{color: 'black' , fontWeight: '700'}}>Buy Now</a>
                    </div>
                    <div class="card">
                        <h2 class="card_title">Personal</h2>
                        <p class="pricing">₹199<span class="small">month</span></p>
                        <p style={{color: "green"}}>Save ₹15</p>
                        <ul class="features">
                            <li>Profile Enhancement</li>
                            <li>Direct Recruiter Contact</li>
                            <li>Fast Processing of Application</li>
                        </ul>
                        <a href="#" class="cta_btn" style={{color: 'black' , fontWeight: '700'}}>Buy Now</a>
                    </div>
                    <div class="card">
                        <h2 class="card_title">Company</h2>
                        <p class="pricing">₹399<span class="small">month</span></p>
                        <p style={{color: "green"}}>Save ₹25</p>
                        <ul class="features">
                            <li>Multiple Recruiter Access</li>
                            <li>Candidate Automated Filtering</li>
                            <li>End-To-End Solution (Chat , Video , Audio)</li>
                        </ul>
                        <a href="#" class="cta_btn" style={{color: 'black' , fontWeight: '700'}}>Buy Now</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Price
