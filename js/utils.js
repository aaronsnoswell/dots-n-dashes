
var Utils = {};

;(function() {

    /**
     * Compares the items in the given two arrays
     * @param Array arr1 The first Array
     * @param Array arr2 The second Array
     * @return Boolean true if the Array items are equal
     */
    Utils.compare_arrays = function(arr1, arr2) {
        if(arr1.length != arr2.length) {
            return false;
        }

        for(var i=0; i<arr1.length; i++) {
            var match = false;

            for(var j=i; j<arr2.length; j++) {
                if(arr1[i] === arr2[j]) {
                    match = true;
                }
            }

            if(!match) {
                return false;
            }
        }

        return true;
    }

})();

    