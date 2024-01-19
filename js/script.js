function calculateAndUpdatePrice() {
    var originalPricePer1000USD = parseFloat(
      document.getElementById("originalPrice").value
    );
    var quantityInThousands = parseInt(
      document.getElementById("quantity").value
    );
    var exchangeRate = parseFloat(
      document.getElementById("exchangeRate").value
    );
    var desiredProfitPercentage = parseFloat(
      document.getElementById("profitPercentage").value
    );

    // Set default exchange rate to 118 if not provided
    exchangeRate = isNaN(exchangeRate) ? 118 : exchangeRate;
    desiredProfitPercentage = isNaN(desiredProfitPercentage) ? 35 : desiredProfitPercentage 

    if (
      !isNaN(originalPricePer1000USD) &&
      !isNaN(quantityInThousands) &&
      quantityInThousands > 0 &&
      !isNaN(desiredProfitPercentage)
    ) {
      var pricePerUnitUSD = originalPricePer1000USD / 1000;

      // Calculate the original total price without profit
      var originalTotalPriceUSD =
        pricePerUnitUSD * quantityInThousands * 1000;

      // Calculate the updated total price with profit for the desired percentage
      var profitFactor = 1 + desiredProfitPercentage / 100;
      var updatedTotalPriceUSD =
        pricePerUnitUSD * profitFactor * quantityInThousands * 1000;

      // Convert both prices to BDT based on the exchange rate
      var originalTotalPriceBDT = originalTotalPriceUSD * exchangeRate;
      var updatedTotalPriceBDT = updatedTotalPriceUSD * exchangeRate;

      // Round up the updated total price to the nearest x5
      var roundedPriceBDT = roundUpToNearest(updatedTotalPriceBDT);

      // Calculate the profited amount in BDT
      var profitedAmountBDT = roundedPriceBDT - originalTotalPriceBDT;

      document.getElementById("result").innerHTML =
      `Quantity: ${quantityInThousands * 1000}</br>Buying price: ${originalTotalPriceBDT.toFixed(2)} BDT<br>Selling Price: ${updatedTotalPriceBDT.toFixed(2)} (${desiredProfitPercentage}) BDT </br>Suggested price: ${roundedPriceBDT.toFixed(2)} BDT<br>Profit: ${profitedAmountBDT.toFixed(2)} BDT`;
    } else {
      document.getElementById("result").innerHTML =
        "Please enter valid numbers for the original price per 1000 units, quantity in thousands, exchange rate, and desired profit percentage.";
    }
  }

  function roundUpToNearest(price) {
    // xxxtra profit >.<
    var roundedPrice = Math.ceil(price / 5) * 5;
    return roundedPrice;
  }