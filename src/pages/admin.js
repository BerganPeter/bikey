import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { Amplify } from 'aws-amplify';
import { Authenticator,withAuthenticator,useAuthenticator} from '@aws-amplify/ui-react';
import config from '../aws-exports'
import '@aws-amplify/ui-react/styles.css';
import {uploadData  } from '@aws-amplify/storage';
import { createBike } from '../api/mutation'
import { generateClient } from 'aws-amplify/api';



Amplify.configure(config);



const {
    aws_user_files_s3_bucket_region: region,
    aws_user_files_s3_bucket: bucket
} = config

const client = generateClient();


  


const Admin = () => {
    const [image, setImage] = useState(null);
    const [bikeDetails, setBikeDetails] = useState({ name: "", description: "", image: "", brand: "", price: "" }); 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!bikeDetails.name || !bikeDetails.price) return 
            await client.graphql({
                authMode: 'userPool',
                query:createBike,
                variables: { input: bikeDetails}
            })
            setBikeDetails({ name: "", description: "", image: "", brand: "", price: "" }) ;
        } catch (err) {
            console.log('error creating bike:', err)
            console.log('GraphQL error:', err.errors); 
        }
    }

    const { user, signOut } = useAuthenticator((context) => [context.user]);

    const handleImageUpload = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const extension = file.name.split(".")[1];
        const name = file.name.split(".")[0];
        const key = `images/${uuidv4()}${name}.${extension}`;
        const url = `https://${bucket}.s3.${region}.amazonaws.com/${key}`
        try { 
            await uploadData({path: key, data: file, options: { level: 'guest'
              } }).result;
            const image = await uploadData({path: key, data: file, options: { level: 'guest'
              } }).result;
            setImage(image);
            setBikeDetails({ ...bikeDetails, image: url }); 
        } catch (err) {
            console.log(err)
            console.log('Authentication error',err.errors);
        }
    }


    return (
        <section className="admin-wrapper">
            <Authenticator  >
                <section>
                    <header className="form-header">
                        <h2>Welcome, {user.username}!</h2>
                        <h3>Add New Bike</h3>
                        <button onClick={signOut}>Sign Out</button>
                    </header>
                    <form className="form-wrapper" onSubmit={handleSubmit}>
                        <div className="form-image">
                            {image ? <img className="image-preview" src={image} alt="" /> : <input
                                type="file"
                                accept="image/jpg"
                                onChange={(e) => handleImageUpload(e)} />}

                        </div>
                        <div className="form-fields">
                            <div className="title-form">
                                <p><label htmlFor="name">Name</label></p> 
                                <p><input
                                    name="name"
                                    type="text"
                                    placeholder="Type the name"
                                    onChange={(e) => setBikeDetails({ ...bikeDetails, name: e.target.value })} 
                                    required
                                /></p>
                            </div>
                            <div className="description-form">
                                <p><label htmlFor="description">Description</label></p>
                                <p><textarea
                                    name="description"
                                    type="text"
                                    rows="8"
                                    placeholder="Type the description of the bike"
                                    onChange={(e) => setBikeDetails({ ...bikeDetails, description: e.target.value })} 
                                    required
                                /></p>
                            </div>
                            <div className="author-form">
                                <p><label htmlFor="brand">Brand</label></p> 
                                <p><input
                                    name="brand"
                                    type="text"
                                    placeholder="Type the brand's name" 
                                    onChange={(e) => setBikeDetails({ ...bikeDetails, brand: e.target.value })} 
                                    required
                                /></p>
                            </div>
                            <div className="price-form">
                                <p><label htmlFor="price">Price (USD)</label>
                                    <input
                                        name="price"
                                        type="text"
                                        placeholder="What is the Price of the bike (USD)"
                                        onChange={(e) => setBikeDetails({ ...bikeDetails, price: e.target.value })} 
                                        required
                                    /></p>
                            </div>
                            <div className="featured-form">
                                <p><label>Featured?</label>
                                    <input type="checkbox"
                                        className="featured-checkbox"
                                        checked={bikeDetails.featured}
                                        onChange={() => setBikeDetails({ ...bikeDetails, featured: !bikeDetails.featured })} 
                                    />
                                </p>
                            </div>
                            <div className="submit-form">
                                <button className="btn" type="submit">Submit</button>
                            </div>
                        </div>
                    </form>
                </section>
            </Authenticator>
        </section>
    )
}

export default withAuthenticator(Admin)
