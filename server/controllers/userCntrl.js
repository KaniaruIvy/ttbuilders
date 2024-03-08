import asyncHandler from 'express-async-handler'
import {prisma} from '../config/prismaConfig.js'

//Function to create new user
export const createUser=asyncHandler(async(req, res)=>{
    console.log("Creating a user");

    let{email}=req.body;
    const userExists=await prisma.user.findUnique({where: {email:email}});
    if(!userExists){
        const user = await prisma.user.create({data:req.body});
        res.send({
            message:"User registered successfully",
            user:user
        });
    }else res.status(201).send({message:"User already registered"});
}); 

//Function to book a visit to a location
export const bookVisit=asyncHandler(async(req, res)=>{
    const{email, date} = req.body;
    const {id }= req.params;

    try{
        const alreadyBooked = await prisma.user.findUnique({
            where:{email:email}, 
            select:{bookedVisits:true}});
        if(alreadyBooked.bookedVisits.some((visit)=>visit.id===id)){
            res.status(400).json({message:"You have already booked this residency"})
        }else{
            await prisma.user.update({
                where:{email:email},
                data:{
                    bookedVisits:{push:{id,date}}
                }
            });
            res.send("Your visit was booked successfully");
        }

    }catch(err){
        throw new Error(err.message);
    }
});

//Function to get all bookings of a user
export const getAllBookings=asyncHandler(async(req,res)=>{
    const {email}=req.body;
    try{
        const bookings=await prisma.user.findUnique({
            where:{email:email},
            select:{bookedVisits:true}
        });
        res.status(200).send(bookings);

    }catch(err){
        throw new Error(err.message);
    }
});

//Functions to cancel a booking
export const cancelBooking=asyncHandler(async(req,res)=>{
    const {email} =req.body;
    const {id}=req.params;
    try{
        const user = await prisma.user.findUnique({
            where:{email:email},
            select:{bookedVisits:true}
        })
        const index = user.bookedVisits.findIndex((visit)=>visit.id===id)
        if(index===-1){
            res.status(404).json({message:"Booking not found"})
            }else{
                user.bookedVisits.splice(index,1)
                await prisma.user.update({
                    where:{email:email},
                    data:{
                        bookedVisits:user.bookedVisits
                    }
                });
                res.send("Booking cancelled successfully");
            }
    }catch(err){
        throw new Error(err.message)
    }

})

//Function to add a resd in favourites list
export const toFav=asyncHandler(async(req,res)=>{
    const {email} = req.body;
    const {rid}=req.params;

    try{
        const user=await prisma.user.findUnique({
            where:{email:email}
        })
        if(user.favResidenciesID.includes(rid)){
            const updateUser = await prisma.user.update({
                where:{email},
                data:{
                    favResidenciesID:{
                        set:user.favResidenciesID.filter((id)=>id !==rid)
                    }
                }
            });
            res.send({message:"Removed from favourites", user:updateUser});
        }else{
            const updateUser=await prisma.user.update({
                where:{email},
                data:{
                    favResidenciesID:{
                        push:rid
                    }
                }
            })
            res.send({message:"Updated favorites",user:updateUser});
        }
    }catch(err){
        throw new Error(err.message);
    }
})

//Function to get all favourites
export const getAllFavorites=asyncHandler(async(req,res)=>{
    const {email} = req.body;
    try{
        const favResd=await prisma.user.findUnique({
            where:{email},
            select:{favResidenciesID:true}
        })
        res.status(200).send(favResd)

    }catch(err){
        throw new Error(err.message);
    }
})