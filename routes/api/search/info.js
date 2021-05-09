var express = require('express');
var router = express.Router();

const authUtil = require("../../../module/utils/authUtils");   // 토큰 있을 때 사용ßß

const defaultRes = require('../../../module/utils/utils');
const statusCode = require('../../../module/utils/statusCode');
const resMessage = require('../../../module/utils/responseMessage');
const db = require('../../../module/pool');

router.get('/percent/:food', authUtil.checkLogin,async (req, res) => {

    let food = req.params.food;
    const SelectQuery = 
    `		select	energy	* 	0	as g	,	'energy'	as nutname	,	'일반성분'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	moisture	* 	1	as g	,	'moisture'	as nutname	,	'일반성분'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	protein	* 	1	as g	,	'protein'	as nutname	,	'일반성분'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Lipid	* 	1	as g	,	'Lipid'	as nutname	,	'일반성분'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Ash	* 	1	as g	,	'Ash'	as nutname	,	'일반성분'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	carbohydrate	* 	1	as g	,	'carbohydrate'	as nutname	,	'일반성분'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Total_sugars	* 	1	as g	,	'Total_sugars'	as nutname	,	'일반성분'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	saccharose	* 	1	as g	,	'saccharose'	as nutname	,	'일반성분'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	glucose	* 	1	as g	,	'glucose'	as nutname	,	'일반성분'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	fruit_sugar	* 	1	as g	,	'fruit_sugar'	as nutname	,	'일반성분'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Lactose	* 	1	as g	,	'Lactose'	as nutname	,	'일반성분'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Maltose	* 	1	as g	,	'Maltose'	as nutname	,	'일반성분'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Galactose	* 	1	as g	,	'Galactose'	as nutname	,	'일반성분'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Total_dietary_fiber	* 	1	as g	,	'Total_dietary_fiber'	as nutname	,	'일반성분'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Water_soluble_dietary_fiber	* 	1	as g	,	'Water_soluble_dietary_fiber'	as nutname	,	'일반성분'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Insoluble_dietary_fiber	* 	1	as g	,	'Insoluble_dietary_fiber'	as nutname	,	'일반성분'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Total_amino_acids	* 	0.001	as g	,	'Total_amino_acids'	as nutname	,	'아미노산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Essential_amino_acids	* 	0.001	as g	,	'Essential_amino_acids'	as nutname	,	'아미노산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Isoleucine	* 	0.001	as g	,	'Isoleucine'	as nutname	,	'아미노산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Leucine	* 	0.001	as g	,	'Leucine'	as nutname	,	'아미노산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Lysine	* 	0.001	as g	,	'Lysine'	as nutname	,	'아미노산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Methionine	* 	0.001	as g	,	'Methionine'	as nutname	,	'아미노산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Phenylalanine	* 	0.001	as g	,	'Phenylalanine'	as nutname	,	'아미노산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Threonine	* 	0.001	as g	,	'Threonine'	as nutname	,	'아미노산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Tryptophan	* 	0.001	as g	,	'Tryptophan'	as nutname	,	'아미노산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Valine	* 	0.001	as g	,	'Valine'	as nutname	,	'아미노산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Histidine	* 	0.001	as g	,	'Histidine'	as nutname	,	'아미노산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Arginine	* 	0.001	as g	,	'Arginine'	as nutname	,	'아미노산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Non_essential_amino_acids	* 	0.001	as g	,	'Non_essential_amino_acids'	as nutname	,	'아미노산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Tyrosine	* 	0.001	as g	,	'Tyrosine'	as nutname	,	'아미노산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Cysteine	* 	0.001	as g	,	'Cysteine'	as nutname	,	'아미노산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Alanine	* 	0.001	as g	,	'Alanine'	as nutname	,	'아미노산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Aspartic_acid	* 	0.001	as g	,	'Aspartic_acid'	as nutname	,	'아미노산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Glutamic_acid	* 	0.001	as g	,	'Glutamic_acid'	as nutname	,	'아미노산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Glycine	* 	0.001	as g	,	'Glycine'	as nutname	,	'아미노산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Proline	* 	0.001	as g	,	'Proline'	as nutname	,	'아미노산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Serine	* 	0.001	as g	,	'Serine'	as nutname	,	'아미노산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Taurine	* 	0.001	as g	,	'Taurine'	as nutname	,	'아미노산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Total_fatty_acids	* 	1	as g	,	'Total_fatty_acids'	as nutname	,	'지방산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Total_essential_fatty_acids	* 	1	as g	,	'Total_essential_fatty_acids'	as nutname	,	'지방산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Total_saturated_fatty_acids	* 	1	as g	,	'Total_saturated_fatty_acids'	as nutname	,	'지방산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Butyric_acid	* 	0.001	as g	,	'Butyric_acid'	as nutname	,	'지방산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Caproic_acid	* 	0.001	as g	,	'Caproic_acid'	as nutname	,	'지방산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Caprylic_acid	* 	0.001	as g	,	'Caprylic_acid'	as nutname	,	'지방산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Capric_acid	* 	0.001	as g	,	'Capric_acid'	as nutname	,	'지방산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Lauric_acid	* 	0.001	as g	,	'Lauric_acid'	as nutname	,	'지방산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Tridecanoic_acid	* 	0.001	as g	,	'Tridecanoic_acid'	as nutname	,	'지방산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Myristic_acid	* 	0.001	as g	,	'Myristic_acid'	as nutname	,	'지방산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Pentadecanoic_acid	* 	0.001	as g	,	'Pentadecanoic_acid'	as nutname	,	'지방산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Palmitic_acid	* 	0.001	as g	,	'Palmitic_acid'	as nutname	,	'지방산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Heptadecanoic_acid	* 	0.001	as g	,	'Heptadecanoic_acid'	as nutname	,	'지방산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Stearic_acid	* 	0.001	as g	,	'Stearic_acid'	as nutname	,	'지방산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Arachidic_acid	* 	0.001	as g	,	'Arachidic_acid'	as nutname	,	'지방산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Heneikosan_Mountain	* 	0.001	as g	,	'Heneikosan_Mountain'	as nutname	,	'지방산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Mount_Behen	* 	0.001	as g	,	'Mount_Behen'	as nutname	,	'지방산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Trichoic_acid	* 	0.001	as g	,	'Trichoic_acid'	as nutname	,	'지방산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Lignoceric_acid	* 	0.001	as g	,	'Lignoceric_acid'	as nutname	,	'지방산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Total_monounsaturated_fatty_acids	* 	1	as g	,	'Total_monounsaturated_fatty_acids'	as nutname	,	'지방산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Myristoleic_acid	* 	0.001	as g	,	'Myristoleic_acid'	as nutname	,	'지방산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Palmitoleic_acid	* 	0.001	as g	,	'Palmitoleic_acid'	as nutname	,	'지방산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Heptadecenic_acid	* 	0.001	as g	,	'Heptadecenic_acid'	as nutname	,	'지방산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Oleic_acid	* 	0.001	as g	,	'Oleic_acid'	as nutname	,	'지방산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Baksensan	* 	0.001	as g	,	'Baksensan'	as nutname	,	'지방산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Mount_Gadole	* 	0.001	as g	,	'Mount_Gadole'	as nutname	,	'지방산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Mount_Eruk	* 	0.001	as g	,	'Mount_Eruk'	as nutname	,	'지방산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Mount_Nerbon	* 	0.001	as g	,	'Mount_Nerbon'	as nutname	,	'지방산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Total_polyunsaturated_fatty_acids	* 	1	as g	,	'Total_polyunsaturated_fatty_acids'	as nutname	,	'지방산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Linoleic_acid	* 	0.001	as g	,	'Linoleic_acid'	as nutname	,	'지방산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Alpha_Linolenic_Acid	* 	0.001	as g	,	'Alpha_Linolenic_Acid'	as nutname	,	'지방산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Gamma_Linolenic_Acid	* 	0.001	as g	,	'Gamma_Linolenic_Acid'	as nutname	,	'지방산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Eicosadienoic_acid	* 	0.001	as g	,	'Eicosadienoic_acid'	as nutname	,	'지방산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Eicosatrienoic_acid	* 	0.001	as g	,	'Eicosatrienoic_acid'	as nutname	,	'지방산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Eicosatrienoic_acid	* 	0.001	as g	,	'Eicosatrienoic_acid'	as nutname	,	'지방산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Arachidonic_acid	* 	0.001	as g	,	'Arachidonic_acid'	as nutname	,	'지방산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Eicosapentaenoic_acid	* 	0.001	as g	,	'Eicosapentaenoic_acid'	as nutname	,	'지방산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Docosadienosan	* 	0.001	as g	,	'Docosadienosan'	as nutname	,	'지방산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Docosapentaenoic_acid	* 	0.001	as g	,	'Docosapentaenoic_acid'	as nutname	,	'지방산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Docosahexaenoic_acid	* 	0.001	as g	,	'Docosahexaenoic_acid'	as nutname	,	'지방산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Omega_3	* 	1	as g	,	'Omega_3'	as nutname	,	'지방산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Omega_6	* 	1	as g	,	'Omega_6'	as nutname	,	'지방산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Total_trans_fatty_acids	* 	1	as g	,	'Total_trans_fatty_acids'	as nutname	,	'지방산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Trans_oleic_acid	* 	0.001	as g	,	'Trans_oleic_acid'	as nutname	,	'지방산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Trans_linoleic_acid	* 	0.001	as g	,	'Trans_linoleic_acid'	as nutname	,	'지방산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Trans_linolenic_acid	* 	0.001	as g	,	'Trans_linolenic_acid'	as nutname	,	'지방산'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	calcium	* 	0.001	as g	,	'calcium'	as nutname	,	'무기질'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	iron	* 	0.001	as g	,	'iron'	as nutname	,	'무기질'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	magnesium	* 	0.001	as g	,	'magnesium'	as nutname	,	'무기질'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	sign	* 	0.001	as g	,	'sign'	as nutname	,	'무기질'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	potassium	* 	0.001	as g	,	'potassium'	as nutname	,	'무기질'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	salt	* 	0.001	as g	,	'salt'	as nutname	,	'무기질'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	zinc	* 	0.001	as g	,	'zinc'	as nutname	,	'무기질'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Copper	* 	0.001	as g	,	'Copper'	as nutname	,	'무기질'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	manganese	* 	0.001	as g	,	'manganese'	as nutname	,	'무기질'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Selenium	* 	0.000001	as g	,	'Selenium'	as nutname	,	'무기질'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	molybdenum	* 	0.000001	as g	,	'molybdenum'	as nutname	,	'무기질'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	iodine	* 	0.000001	as g	,	'iodine'	as nutname	,	'무기질'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Retinol	* 	0.000001	as g	,	'Retinol'	as nutname	,	'비타민'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Beta_carotene	* 	0.000001	as g	,	'Beta_carotene'	as nutname	,	'비타민'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Vitamin_B1	* 	0.001	as g	,	'Vitamin_B1'	as nutname	,	'비타민'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Vitamin_B2	* 	0.001	as g	,	'Vitamin_B2'	as nutname	,	'비타민'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Niacin	* 	0.001	as g	,	'Niacin'	as nutname	,	'비타민'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Niacin_NE	* 	0.001	as g	,	'Niacin_NE'	as nutname	,	'비타민'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Nicotinic_acid	* 	0.001	as g	,	'Nicotinic_acid'	as nutname	,	'비타민'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Nicotinamide	* 	0.001	as g	,	'Nicotinamide'	as nutname	,	'비타민'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Pantothenic_acid	* 	0.001	as g	,	'Pantothenic_acid'	as nutname	,	'비타민'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Vitamin_B6	* 	0.001	as g	,	'Vitamin_B6'	as nutname	,	'비타민'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Pyridoxine	* 	0.001	as g	,	'Pyridoxine'	as nutname	,	'비타민'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Biotin	* 	0.000001	as g	,	'Biotin'	as nutname	,	'비타민'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Folic_acid_DFE	* 	0.000001	as g	,	'Folic_acid_DFE'	as nutname	,	'비타민'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Folic_Acid_Food_Folic_Acid	* 	0.000001	as g	,	'Folic_Acid_Food_Folic_Acid'	as nutname	,	'비타민'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Folic_acid_added_folic_acid	* 	0.000001	as g	,	'Folic_acid_added_folic_acid'	as nutname	,	'비타민'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Vitamin_B12	* 	0.000001	as g	,	'Vitamin_B12'	as nutname	,	'비타민'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Vitamin_C	* 	0.001	as g	,	'Vitamin_C'	as nutname	,	'비타민'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Vitamin_D	* 	0.000001	as g	,	'Vitamin_D'	as nutname	,	'비타민'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Vitamin_D2	* 	0.000001	as g	,	'Vitamin_D2'	as nutname	,	'비타민'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Vitamin_D3	* 	0.000001	as g	,	'Vitamin_D3'	as nutname	,	'비타민'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Vitamin_E	* 	0.001	as g	,	'Vitamin_E'	as nutname	,	'비타민'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Alpha_tocopherol	* 	0.001	as g	,	'Alpha_tocopherol'	as nutname	,	'비타민'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Beta_tocopherol	* 	0.001	as g	,	'Beta_tocopherol'	as nutname	,	'비타민'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Gamma_Tocopherol	* 	0.001	as g	,	'Gamma_Tocopherol'	as nutname	,	'비타민'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Delta_tocopherol	* 	0.001	as g	,	'Delta_tocopherol'	as nutname	,	'비타민'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Alpha_tocotrienol	* 	0.001	as g	,	'Alpha_tocotrienol'	as nutname	,	'비타민'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Beta_tocotrienol	* 	0.001	as g	,	'Beta_tocotrienol'	as nutname	,	'비타민'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Gamma_Tocotrienol	* 	0.001	as g	,	'Gamma_Tocotrienol'	as nutname	,	'비타민'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Delta_Tocotrienol	* 	0.001	as g	,	'Delta_Tocotrienol'	as nutname	,	'비타민'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Vitamin_K	* 	0.000001	as g	,	'Vitamin_K'	as nutname	,	'비타민'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Vitamin_K1	* 	0.000001	as g	,	'Vitamin_K1'	as nutname	,	'비타민'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Vitamin_K2	* 	0.000001	as g	,	'Vitamin_K2'	as nutname	,	'비타민'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	cholesterol	* 	0.001	as g	,	'cholesterol'	as nutname	,	'기타'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Salt_equivalent	* 	1	as g	,	'Salt_equivalent'	as nutname	,	'기타'	as category	from	food_detail	where	name = '${food}'	`
    +	`	union all	select	Discard_rate	* 	0	as g	,	'Discard_rate'	as nutname	,	'기타'	as category	from	food_detail	where	name = '${food}'	`
    +   'ORDER BY g DESC '
    +   'LIMIT 5';
     console.log(SelectQuery);
    const SelectResult = await db.queryParam_None(SelectQuery);

 
    if(!SelectResult){
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));   
    }else{
        res.status(200).send(defaultRes.successTrue(statusCode.OK, "성분 퍼센트 차트 조회 성공", SelectResult));      
    }
});


module.exports = router;