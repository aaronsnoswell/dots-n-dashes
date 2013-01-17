
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

    /**
     * Converts the given array of strings to a set in O(n) time
     * @ref http://stackoverflow.com/a/13847481/885287
     * @param Array arr The array of strings to set-ify
     * @return Array A sub-set of all items in arr, where each element is
     *  unique
     */
    Utils.string_array_to_set = function(arr) {
        var output = [],
            hash = {};

        for(var i=0; i<arr.length; i++) {
            var item = arr[i];
            if(!hash[item]) {
                hash[item] = true;
                output.push(item);
            }
        }

        return output;
    }

})();

    