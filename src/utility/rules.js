const rule1_alphaNumeric = (retailer) => {
    var regex = /^[0-9a-zA-Z]+$/;
    var length=0;
    for (var i = 0; i < retailer.length; i++) {
        if(retailer.charAt(i).match(regex)){
            length++
        };
      }
    return length;    
};

const rule2_round = (total) => {
    if((total - Math.floor(total)) == 0)
        return true;
    else
        return false;
};

const rule3_multiple = (total) => {
    if(total%0.25==0)
        return true;
    else
        return false;
};

const rule4_items = (tot_items) => {
    if(tot_items!=0)
        return Math.floor(tot_items/2)*5;
};

const rule5_trim = (items) => {
    var tempPoints = 0
    items.forEach(element => {
        descriptionLength = element.shortDescription.trim().length;
        if(descriptionLength%3==0)
            tempPoints = tempPoints + Math.ceil(element.price*0.2);
    });
    return tempPoints;
};

const rule6_date = (purchaseDate) => {
    const pDate = purchaseDate.split("-");
    if(pDate[2]%2 !=0)
        return true;
    else
        return false;
};

const rule7_hour = (purchaseTime) => {
    const hour = purchaseTime.split(":");
    if(hour[0]>=14 && hour[0]<=16)
        return true;    
};

  module.exports={
    rule1_alphaNumeric,
    rule2_round,
    rule3_multiple,
    rule4_items,
    rule5_trim,
    rule6_date,
    rule7_hour
}