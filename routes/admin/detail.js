var express = require('express');
var router = express.Router();

const upload = require('../../config/multer');
var moment = require('moment');

const defaultRes = require("../../module/utils/utils");
const statusCode = require("../../module/utils/statusCode");
const resMessage = require("../../module/utils/responseMessage");
const db = require("../../module/pool");

router.post('/', async(req, res) => {


    console.log(req.body)
    let insertDetailQuery =  'INSERT INTO food_detail '
    +' (name	,status,	efficacy,	combination,	select_tip,	care,	energy,	moisture,	protein,	lipid,	ash,	carbohydrate,	total_sugars,	saccharose,	glucose,	fruit_sugar,	Lactose,	Maltose,	Galactose,	Total_dietary_fiber,	water_soluble_dietary_fiber,	insoluble_dietary_fiber,	total_amino_acids'
        +',	essential_amino_acids,	isoleucine,	leucine, Lysine,	Methionine,	Phenylalanine,	Threonine,	Tryptophan,	Valine'
        +',	Histidine	,Arginine	,Non_essential_amino_acids	,Tyrosine	,Cysteine	,Alanine	,Aspartic_acid	,Glutamic_acid	,Glycine'
        +',	Proline,	Serine	,Taurine	,Total_fatty_acids	,Total_essential_fatty_acids	,Total_saturated_fatty_acids	,Butyric_acid	,Caproic_acid'	
        +',Caprylic_acid	,Capric_acid	,Lauric_acid	,Tridecanoic_acid	,Myristic_acid	,Pentadecanoic_acid	,Palmitic_acid	,Heptadecanoic_acid	,Stearic_acid'
        +',Arachidic_acid	,Heneikosan_Mountain	,Mount_Behen	,Trichoic_acid	,Lignoceric_acid	,Total_monounsaturated_fatty_acids	,Myristoleic_acid	'
        +',Palmitoleic_acid	,Heptadecenic_acid	,Oleic_acid	,Baksensan	,Mount_Gadole	,Mount_Eruk	,Mount_Nerbon	,Total_polyunsaturated_fatty_acids	,Linoleic_acid	'
        +',Alpha_Linolenic_Acid	,Gamma_Linolenic_Acid	,Eicosadienoic_acid	,Eicosatrienoic_acid	,Eicosatrienoic_acid2	,Arachidonic_acid	,Eicosapentaenoic_acid'	
        +',Docosadienosan	,Docosapentaenoic_acid	,Docosahexaenoic_acid	,Omega_3	,Omega_6	,Total_trans_fatty_acids	,Trans_oleic_acid	,Trans_linoleic_acid'
        +',	Trans_linolenic_acid	,calcium	,iron	,magnesium	,sign	,potassium	,salt	,zinc	,Copper	,manganese	,Selenium	,molybdenum	,iodine	'
        +',Retinol	,Beta_carotene	,Vitamin_B1	,Vitamin_B2,	Niacin,	Niacin_NE,	Nicotinic_acid,	Nicotinamide,	Pantothenic_acid,	Vitamin_B6,	Pyridoxine,	Biotin'
        +',	Folic_acid_DFE,	Folic_Acid_Food_Folic_Acid,	Folic_acid_added_folic_acid	,Vitamin_B12,	Vitamin_C,	Vitamin_D,	Vitamin_D2,	Vitamin_D3,	Vitamin_E'
        +',	Alpha_tocopherol	,Beta_tocopherol,	Gamma_Tocopherol	,Delta_tocopherol,	Alpha_tocotrienol,	Beta_tocotrienol,	Gamma_Tocotrienol'
        +',	Delta_Tocotrienol	,Vitamin_K,	Vitamin_K1,Vitamin_K2	,cholesterol	,Salt_equivalent,	Discard_rate)'
    +' VALUES (?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,	?,?)';
    
    console.log(insertDetailQuery);
      let  insertDetailResult = await db.queryParam_Arr(insertDetailQuery, 
            [req.body.name,req.body.status,req.body.efficacy,req.body.combination,req.body.select_tip,req.body.care,req.body.	energy,req.body.	moisture,req.body.protein,req.body.lipid,req.body.ash,req.body.carbohydrate,req.body.total_sugars,req.body.saccharose,req.body.glucose,req.body.fruit_sugar,req.body.Lactose,req.body.Maltose,req.body.Galactose,req.body.Total_dietary_fiber,
                req.body.water_soluble_dietary_fiber,req.body.insoluble_dietary_fiber,req.body.total_amino_acids 
                 ,req.body.essential_amino_acids,req.body.isoleucine,req.body.leucine,req.body.Lysine,req.body.	Methionine,
                 req.body.Phenylalanine,req.body.Threonine,req.body.Tryptophan,req.body.Valine 
                 ,req.body.Histidine	,req.body.Arginine	,req.body.Non_essential_amino_acids	,req.body.Tyrosine	,req.body.Cysteine	
                 ,req.body.Alanine	,req.body.Aspartic_acid	,req.body.Glutamic_acid	,req.body.Glycine 
                 ,req.body.Proline,req.body.Serine	,req.body.Taurine	,req.body.Total_fatty_acids	,req.body.Total_essential_fatty_acids	,req.body.Total_saturated_fatty_acids	,
                 req.body.Butyric_acid	,req.body.Caproic_acid 	
                 ,req.body.Caprylic_acid	,req.body.Capric_acid	,req.body.Lauric_acid	,req.body.Tridecanoic_acid	
                 ,req.body.Myristic_acid	,req.body.Pentadecanoic_acid	,req.body.Palmitic_acid	,req.body.Heptadecanoic_acid	,req.body.Stearic_acid 
                 ,req.body.Arachidic_acid	,req.body.Heneikosan_Mountain	,req.body.Mount_Behen	,req.body.Trichoic_acid	,req.body.Lignoceric_acid	
                 ,req.body.Total_monounsaturated_fatty_acids	,req.body.Myristoleic_acid	 
                 ,req.body.Palmitoleic_acid	,req.body.Heptadecenic_acid	,req.body.Oleic_acid	
                 ,req.body.Baksensan	,req.body.Mount_Gadole	,req.body.Mount_Eruk	
                 ,req.body.Mount_Nerbon	,req.body.Total_polyunsaturated_fatty_acids	,req.body.Linoleic_acid	 
                 ,req.body.Alpha_Linolenic_Acid	,req.body.Gamma_Linolenic_Acid	,req.body.Eicosadienoic_acid	
                 ,req.body.Eicosatrienoic_acid	,req.body.Eicosatrienoic_acid2	,req.body.Arachidonic_acid	,req.body.Eicosapentaenoic_acid 	
                 ,req.body.Docosadienosan	,req.body.Docosapentaenoic_acid	,req.body.Docosahexaenoic_acid	,req.body.Omega_3	,req.body.Omega_6	
                 ,req.body.Total_trans_fatty_acids	,req.body.Trans_oleic_acid,req.body.Trans_linoleic_acid 
                 ,req.body.Trans_linolenic_acid	,req.body.calcium	,req.body.iron	,req.body.magnesium	,req.body.sign	,req.body.potassium	
                 ,req.body.salt	,req.body.zinc	,req.body.Copper	,req.body.manganese	,req.body.Selenium,req.body.molybdenum,req.body.iodine	 
                 ,req.body.Retinol	,req.body.Beta_carotene	,req.body.Vitamin_B1	,req.body.Vitamin_B2,req.body.Niacin,req.body.Niacin_NE,
                 req.body.Nicotinic_acid,req.body.Nicotinamide,req.body.Pantothenic_acid,req.body.Vitamin_B6,req.body.Pyridoxine,req.body.Biotin 
                 ,req.body.Folic_acid_DFE,req.body.Folic_Acid_Food_Folic_Acid,req.body.Folic_acid_added_folic_acid	,req.body.Vitamin_B12,
                 req.body.Vitamin_C,req.body.Vitamin_D,req.body.Vitamin_D2,req.body.Vitamin_D3,req.body.Vitamin_E 
                 ,req.body.Alpha_tocopherol	,req.body.Beta_tocopherol,req.body.Gamma_Tocopherol	,req.body.Delta_tocopherol,req.body.Alpha_tocotrienol,req.body.Beta_tocotrienol,
                 req.body.Gamma_Tocotrienol 
                 ,req.body.Delta_Tocotrienol	,req.body.Vitamin_K,req.body.Vitamin_K1,req.body.Vitamin_K2	,
                 req.body.cholesterol	,req.body.Salt_equivalent,req.body.Discard_rate]);
   
    

   console.log(insertDetailResult);
    if (!insertDetailResult) {
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.BOARD_INSERT_FAIL));
    } else { //쿼리문이 성공했을 때
  
       res.status(200).send(defaultRes.successTrue(statusCode.OK, resMessage.BOARD_INSERT_SUCCESS));
    }
});
router.get('/', (req, res) => {
    res.sendFile(__dirname + '/detail.html')
});


module.exports = router;