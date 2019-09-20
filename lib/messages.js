/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const Hello = $root.Hello = (() => {

    /**
     * Properties of a Hello.
     * @exports IHello
     * @interface IHello
     * @property {number|null} [version] Hello version
     * @property {Uint8Array|null} [peerId] Hello peerId
     */

    /**
     * Constructs a new Hello.
     * @exports Hello
     * @classdesc Represents a Hello.
     * @implements IHello
     * @constructor
     * @param {IHello=} [properties] Properties to set
     */
    function Hello(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Hello version.
     * @member {number} version
     * @memberof Hello
     * @instance
     */
    Hello.prototype.version = 0;

    /**
     * Hello peerId.
     * @member {Uint8Array} peerId
     * @memberof Hello
     * @instance
     */
    Hello.prototype.peerId = $util.newBuffer([]);

    /**
     * Creates a new Hello instance using the specified properties.
     * @function create
     * @memberof Hello
     * @static
     * @param {IHello=} [properties] Properties to set
     * @returns {Hello} Hello instance
     */
    Hello.create = function create(properties) {
        return new Hello(properties);
    };

    /**
     * Encodes the specified Hello message. Does not implicitly {@link Hello.verify|verify} messages.
     * @function encode
     * @memberof Hello
     * @static
     * @param {IHello} message Hello message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Hello.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.version != null && message.hasOwnProperty("version"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.version);
        if (message.peerId != null && message.hasOwnProperty("peerId"))
            writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.peerId);
        return writer;
    };

    /**
     * Encodes the specified Hello message, length delimited. Does not implicitly {@link Hello.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Hello
     * @static
     * @param {IHello} message Hello message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Hello.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Hello message from the specified reader or buffer.
     * @function decode
     * @memberof Hello
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Hello} Hello
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Hello.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Hello();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.version = reader.uint32();
                break;
            case 2:
                message.peerId = reader.bytes();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Hello message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Hello
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Hello} Hello
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Hello.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Hello message.
     * @function verify
     * @memberof Hello
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Hello.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.version != null && message.hasOwnProperty("version"))
            if (!$util.isInteger(message.version))
                return "version: integer expected";
        if (message.peerId != null && message.hasOwnProperty("peerId"))
            if (!(message.peerId && typeof message.peerId.length === "number" || $util.isString(message.peerId)))
                return "peerId: buffer expected";
        return null;
    };

    /**
     * Creates a Hello message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Hello
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Hello} Hello
     */
    Hello.fromObject = function fromObject(object) {
        if (object instanceof $root.Hello)
            return object;
        let message = new $root.Hello();
        if (object.version != null)
            message.version = object.version >>> 0;
        if (object.peerId != null)
            if (typeof object.peerId === "string")
                $util.base64.decode(object.peerId, message.peerId = $util.newBuffer($util.base64.length(object.peerId)), 0);
            else if (object.peerId.length)
                message.peerId = object.peerId;
        return message;
    };

    /**
     * Creates a plain object from a Hello message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Hello
     * @static
     * @param {Hello} message Hello
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Hello.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.version = 0;
            if (options.bytes === String)
                object.peerId = "";
            else {
                object.peerId = [];
                if (options.bytes !== Array)
                    object.peerId = $util.newBuffer(object.peerId);
            }
        }
        if (message.version != null && message.hasOwnProperty("version"))
            object.version = message.version;
        if (message.peerId != null && message.hasOwnProperty("peerId"))
            object.peerId = options.bytes === String ? $util.base64.encode(message.peerId, 0, message.peerId.length) : options.bytes === Array ? Array.prototype.slice.call(message.peerId) : message.peerId;
        return object;
    };

    /**
     * Converts this Hello to JSON.
     * @function toJSON
     * @memberof Hello
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Hello.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Hello;
})();

export const Shake = $root.Shake = (() => {

    /**
     * Properties of a Shake.
     * @exports IShake
     * @interface IShake
     * @property {boolean|null} [isDuplicate] Shake isDuplicate
     */

    /**
     * Constructs a new Shake.
     * @exports Shake
     * @classdesc Represents a Shake.
     * @implements IShake
     * @constructor
     * @param {IShake=} [properties] Properties to set
     */
    function Shake(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Shake isDuplicate.
     * @member {boolean} isDuplicate
     * @memberof Shake
     * @instance
     */
    Shake.prototype.isDuplicate = false;

    /**
     * Creates a new Shake instance using the specified properties.
     * @function create
     * @memberof Shake
     * @static
     * @param {IShake=} [properties] Properties to set
     * @returns {Shake} Shake instance
     */
    Shake.create = function create(properties) {
        return new Shake(properties);
    };

    /**
     * Encodes the specified Shake message. Does not implicitly {@link Shake.verify|verify} messages.
     * @function encode
     * @memberof Shake
     * @static
     * @param {IShake} message Shake message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Shake.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.isDuplicate != null && message.hasOwnProperty("isDuplicate"))
            writer.uint32(/* id 1, wireType 0 =*/8).bool(message.isDuplicate);
        return writer;
    };

    /**
     * Encodes the specified Shake message, length delimited. Does not implicitly {@link Shake.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Shake
     * @static
     * @param {IShake} message Shake message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Shake.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Shake message from the specified reader or buffer.
     * @function decode
     * @memberof Shake
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Shake} Shake
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Shake.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Shake();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.isDuplicate = reader.bool();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Shake message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Shake
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Shake} Shake
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Shake.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Shake message.
     * @function verify
     * @memberof Shake
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Shake.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.isDuplicate != null && message.hasOwnProperty("isDuplicate"))
            if (typeof message.isDuplicate !== "boolean")
                return "isDuplicate: boolean expected";
        return null;
    };

    /**
     * Creates a Shake message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Shake
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Shake} Shake
     */
    Shake.fromObject = function fromObject(object) {
        if (object instanceof $root.Shake)
            return object;
        let message = new $root.Shake();
        if (object.isDuplicate != null)
            message.isDuplicate = Boolean(object.isDuplicate);
        return message;
    };

    /**
     * Creates a plain object from a Shake message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Shake
     * @static
     * @param {Shake} message Shake
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Shake.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults)
            object.isDuplicate = false;
        if (message.isDuplicate != null && message.hasOwnProperty("isDuplicate"))
            object.isDuplicate = message.isDuplicate;
        return object;
    };

    /**
     * Converts this Shake to JSON.
     * @function toJSON
     * @memberof Shake
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Shake.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Shake;
})();

export const Link = $root.Link = (() => {

    /**
     * Properties of a Link.
     * @exports ILink
     * @interface ILink
     * @property {Link.ITBS|null} [tbs] Link tbs
     * @property {Uint8Array|null} [signature] Link signature
     */

    /**
     * Constructs a new Link.
     * @exports Link
     * @classdesc Represents a Link.
     * @implements ILink
     * @constructor
     * @param {ILink=} [properties] Properties to set
     */
    function Link(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Link tbs.
     * @member {Link.ITBS|null|undefined} tbs
     * @memberof Link
     * @instance
     */
    Link.prototype.tbs = null;

    /**
     * Link signature.
     * @member {Uint8Array} signature
     * @memberof Link
     * @instance
     */
    Link.prototype.signature = $util.newBuffer([]);

    /**
     * Creates a new Link instance using the specified properties.
     * @function create
     * @memberof Link
     * @static
     * @param {ILink=} [properties] Properties to set
     * @returns {Link} Link instance
     */
    Link.create = function create(properties) {
        return new Link(properties);
    };

    /**
     * Encodes the specified Link message. Does not implicitly {@link Link.verify|verify} messages.
     * @function encode
     * @memberof Link
     * @static
     * @param {ILink} message Link message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Link.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.tbs != null && message.hasOwnProperty("tbs"))
            $root.Link.TBS.encode(message.tbs, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.signature != null && message.hasOwnProperty("signature"))
            writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.signature);
        return writer;
    };

    /**
     * Encodes the specified Link message, length delimited. Does not implicitly {@link Link.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Link
     * @static
     * @param {ILink} message Link message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Link.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Link message from the specified reader or buffer.
     * @function decode
     * @memberof Link
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Link} Link
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Link.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Link();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.tbs = $root.Link.TBS.decode(reader, reader.uint32());
                break;
            case 2:
                message.signature = reader.bytes();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Link message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Link
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Link} Link
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Link.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Link message.
     * @function verify
     * @memberof Link
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Link.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.tbs != null && message.hasOwnProperty("tbs")) {
            let error = $root.Link.TBS.verify(message.tbs);
            if (error)
                return "tbs." + error;
        }
        if (message.signature != null && message.hasOwnProperty("signature"))
            if (!(message.signature && typeof message.signature.length === "number" || $util.isString(message.signature)))
                return "signature: buffer expected";
        return null;
    };

    /**
     * Creates a Link message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Link
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Link} Link
     */
    Link.fromObject = function fromObject(object) {
        if (object instanceof $root.Link)
            return object;
        let message = new $root.Link();
        if (object.tbs != null) {
            if (typeof object.tbs !== "object")
                throw TypeError(".Link.tbs: object expected");
            message.tbs = $root.Link.TBS.fromObject(object.tbs);
        }
        if (object.signature != null)
            if (typeof object.signature === "string")
                $util.base64.decode(object.signature, message.signature = $util.newBuffer($util.base64.length(object.signature)), 0);
            else if (object.signature.length)
                message.signature = object.signature;
        return message;
    };

    /**
     * Creates a plain object from a Link message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Link
     * @static
     * @param {Link} message Link
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Link.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.tbs = null;
            if (options.bytes === String)
                object.signature = "";
            else {
                object.signature = [];
                if (options.bytes !== Array)
                    object.signature = $util.newBuffer(object.signature);
            }
        }
        if (message.tbs != null && message.hasOwnProperty("tbs"))
            object.tbs = $root.Link.TBS.toObject(message.tbs, options);
        if (message.signature != null && message.hasOwnProperty("signature"))
            object.signature = options.bytes === String ? $util.base64.encode(message.signature, 0, message.signature.length) : options.bytes === Array ? Array.prototype.slice.call(message.signature) : message.signature;
        return object;
    };

    /**
     * Converts this Link to JSON.
     * @function toJSON
     * @memberof Link
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Link.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    Link.TBS = (function() {

        /**
         * Properties of a TBS.
         * @memberof Link
         * @interface ITBS
         * @property {Uint8Array|null} [trusteePubKey] TBS trusteePubKey
         * @property {string|null} [trusteeDisplayName] TBS trusteeDisplayName
         * @property {number|null} [validFrom] TBS validFrom
         * @property {number|null} [validTo] TBS validTo
         * @property {Uint8Array|null} [channelId] TBS channelId
         */

        /**
         * Constructs a new TBS.
         * @memberof Link
         * @classdesc Represents a TBS.
         * @implements ITBS
         * @constructor
         * @param {Link.ITBS=} [properties] Properties to set
         */
        function TBS(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TBS trusteePubKey.
         * @member {Uint8Array} trusteePubKey
         * @memberof Link.TBS
         * @instance
         */
        TBS.prototype.trusteePubKey = $util.newBuffer([]);

        /**
         * TBS trusteeDisplayName.
         * @member {string} trusteeDisplayName
         * @memberof Link.TBS
         * @instance
         */
        TBS.prototype.trusteeDisplayName = "";

        /**
         * TBS validFrom.
         * @member {number} validFrom
         * @memberof Link.TBS
         * @instance
         */
        TBS.prototype.validFrom = 0;

        /**
         * TBS validTo.
         * @member {number} validTo
         * @memberof Link.TBS
         * @instance
         */
        TBS.prototype.validTo = 0;

        /**
         * TBS channelId.
         * @member {Uint8Array} channelId
         * @memberof Link.TBS
         * @instance
         */
        TBS.prototype.channelId = $util.newBuffer([]);

        /**
         * Creates a new TBS instance using the specified properties.
         * @function create
         * @memberof Link.TBS
         * @static
         * @param {Link.ITBS=} [properties] Properties to set
         * @returns {Link.TBS} TBS instance
         */
        TBS.create = function create(properties) {
            return new TBS(properties);
        };

        /**
         * Encodes the specified TBS message. Does not implicitly {@link Link.TBS.verify|verify} messages.
         * @function encode
         * @memberof Link.TBS
         * @static
         * @param {Link.ITBS} message TBS message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TBS.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.trusteePubKey != null && message.hasOwnProperty("trusteePubKey"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.trusteePubKey);
            if (message.trusteeDisplayName != null && message.hasOwnProperty("trusteeDisplayName"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.trusteeDisplayName);
            if (message.validFrom != null && message.hasOwnProperty("validFrom"))
                writer.uint32(/* id 3, wireType 1 =*/25).double(message.validFrom);
            if (message.validTo != null && message.hasOwnProperty("validTo"))
                writer.uint32(/* id 4, wireType 1 =*/33).double(message.validTo);
            if (message.channelId != null && message.hasOwnProperty("channelId"))
                writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.channelId);
            return writer;
        };

        /**
         * Encodes the specified TBS message, length delimited. Does not implicitly {@link Link.TBS.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Link.TBS
         * @static
         * @param {Link.ITBS} message TBS message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TBS.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TBS message from the specified reader or buffer.
         * @function decode
         * @memberof Link.TBS
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Link.TBS} TBS
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TBS.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Link.TBS();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.trusteePubKey = reader.bytes();
                    break;
                case 2:
                    message.trusteeDisplayName = reader.string();
                    break;
                case 3:
                    message.validFrom = reader.double();
                    break;
                case 4:
                    message.validTo = reader.double();
                    break;
                case 5:
                    message.channelId = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a TBS message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Link.TBS
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Link.TBS} TBS
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TBS.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TBS message.
         * @function verify
         * @memberof Link.TBS
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TBS.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.trusteePubKey != null && message.hasOwnProperty("trusteePubKey"))
                if (!(message.trusteePubKey && typeof message.trusteePubKey.length === "number" || $util.isString(message.trusteePubKey)))
                    return "trusteePubKey: buffer expected";
            if (message.trusteeDisplayName != null && message.hasOwnProperty("trusteeDisplayName"))
                if (!$util.isString(message.trusteeDisplayName))
                    return "trusteeDisplayName: string expected";
            if (message.validFrom != null && message.hasOwnProperty("validFrom"))
                if (typeof message.validFrom !== "number")
                    return "validFrom: number expected";
            if (message.validTo != null && message.hasOwnProperty("validTo"))
                if (typeof message.validTo !== "number")
                    return "validTo: number expected";
            if (message.channelId != null && message.hasOwnProperty("channelId"))
                if (!(message.channelId && typeof message.channelId.length === "number" || $util.isString(message.channelId)))
                    return "channelId: buffer expected";
            return null;
        };

        /**
         * Creates a TBS message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Link.TBS
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Link.TBS} TBS
         */
        TBS.fromObject = function fromObject(object) {
            if (object instanceof $root.Link.TBS)
                return object;
            let message = new $root.Link.TBS();
            if (object.trusteePubKey != null)
                if (typeof object.trusteePubKey === "string")
                    $util.base64.decode(object.trusteePubKey, message.trusteePubKey = $util.newBuffer($util.base64.length(object.trusteePubKey)), 0);
                else if (object.trusteePubKey.length)
                    message.trusteePubKey = object.trusteePubKey;
            if (object.trusteeDisplayName != null)
                message.trusteeDisplayName = String(object.trusteeDisplayName);
            if (object.validFrom != null)
                message.validFrom = Number(object.validFrom);
            if (object.validTo != null)
                message.validTo = Number(object.validTo);
            if (object.channelId != null)
                if (typeof object.channelId === "string")
                    $util.base64.decode(object.channelId, message.channelId = $util.newBuffer($util.base64.length(object.channelId)), 0);
                else if (object.channelId.length)
                    message.channelId = object.channelId;
            return message;
        };

        /**
         * Creates a plain object from a TBS message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Link.TBS
         * @static
         * @param {Link.TBS} message TBS
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TBS.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.trusteePubKey = "";
                else {
                    object.trusteePubKey = [];
                    if (options.bytes !== Array)
                        object.trusteePubKey = $util.newBuffer(object.trusteePubKey);
                }
                object.trusteeDisplayName = "";
                object.validFrom = 0;
                object.validTo = 0;
                if (options.bytes === String)
                    object.channelId = "";
                else {
                    object.channelId = [];
                    if (options.bytes !== Array)
                        object.channelId = $util.newBuffer(object.channelId);
                }
            }
            if (message.trusteePubKey != null && message.hasOwnProperty("trusteePubKey"))
                object.trusteePubKey = options.bytes === String ? $util.base64.encode(message.trusteePubKey, 0, message.trusteePubKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.trusteePubKey) : message.trusteePubKey;
            if (message.trusteeDisplayName != null && message.hasOwnProperty("trusteeDisplayName"))
                object.trusteeDisplayName = message.trusteeDisplayName;
            if (message.validFrom != null && message.hasOwnProperty("validFrom"))
                object.validFrom = options.json && !isFinite(message.validFrom) ? String(message.validFrom) : message.validFrom;
            if (message.validTo != null && message.hasOwnProperty("validTo"))
                object.validTo = options.json && !isFinite(message.validTo) ? String(message.validTo) : message.validTo;
            if (message.channelId != null && message.hasOwnProperty("channelId"))
                object.channelId = options.bytes === String ? $util.base64.encode(message.channelId, 0, message.channelId.length) : options.bytes === Array ? Array.prototype.slice.call(message.channelId) : message.channelId;
            return object;
        };

        /**
         * Converts this TBS to JSON.
         * @function toJSON
         * @memberof Link.TBS
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TBS.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return TBS;
    })();

    return Link;
})();

export const Invite = $root.Invite = (() => {

    /**
     * Properties of an Invite.
     * @exports IInvite
     * @interface IInvite
     * @property {Uint8Array|null} [channelPubKey] Invite channelPubKey
     * @property {string|null} [channelName] Invite channelName
     * @property {Array.<ILink>|null} [chain] Invite chain
     */

    /**
     * Constructs a new Invite.
     * @exports Invite
     * @classdesc Represents an Invite.
     * @implements IInvite
     * @constructor
     * @param {IInvite=} [properties] Properties to set
     */
    function Invite(properties) {
        this.chain = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Invite channelPubKey.
     * @member {Uint8Array} channelPubKey
     * @memberof Invite
     * @instance
     */
    Invite.prototype.channelPubKey = $util.newBuffer([]);

    /**
     * Invite channelName.
     * @member {string} channelName
     * @memberof Invite
     * @instance
     */
    Invite.prototype.channelName = "";

    /**
     * Invite chain.
     * @member {Array.<ILink>} chain
     * @memberof Invite
     * @instance
     */
    Invite.prototype.chain = $util.emptyArray;

    /**
     * Creates a new Invite instance using the specified properties.
     * @function create
     * @memberof Invite
     * @static
     * @param {IInvite=} [properties] Properties to set
     * @returns {Invite} Invite instance
     */
    Invite.create = function create(properties) {
        return new Invite(properties);
    };

    /**
     * Encodes the specified Invite message. Does not implicitly {@link Invite.verify|verify} messages.
     * @function encode
     * @memberof Invite
     * @static
     * @param {IInvite} message Invite message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Invite.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.channelPubKey != null && message.hasOwnProperty("channelPubKey"))
            writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.channelPubKey);
        if (message.channelName != null && message.hasOwnProperty("channelName"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.channelName);
        if (message.chain != null && message.chain.length)
            for (let i = 0; i < message.chain.length; ++i)
                $root.Link.encode(message.chain[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified Invite message, length delimited. Does not implicitly {@link Invite.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Invite
     * @static
     * @param {IInvite} message Invite message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Invite.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an Invite message from the specified reader or buffer.
     * @function decode
     * @memberof Invite
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Invite} Invite
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Invite.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Invite();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.channelPubKey = reader.bytes();
                break;
            case 2:
                message.channelName = reader.string();
                break;
            case 3:
                if (!(message.chain && message.chain.length))
                    message.chain = [];
                message.chain.push($root.Link.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an Invite message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Invite
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Invite} Invite
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Invite.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an Invite message.
     * @function verify
     * @memberof Invite
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Invite.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.channelPubKey != null && message.hasOwnProperty("channelPubKey"))
            if (!(message.channelPubKey && typeof message.channelPubKey.length === "number" || $util.isString(message.channelPubKey)))
                return "channelPubKey: buffer expected";
        if (message.channelName != null && message.hasOwnProperty("channelName"))
            if (!$util.isString(message.channelName))
                return "channelName: string expected";
        if (message.chain != null && message.hasOwnProperty("chain")) {
            if (!Array.isArray(message.chain))
                return "chain: array expected";
            for (let i = 0; i < message.chain.length; ++i) {
                let error = $root.Link.verify(message.chain[i]);
                if (error)
                    return "chain." + error;
            }
        }
        return null;
    };

    /**
     * Creates an Invite message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Invite
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Invite} Invite
     */
    Invite.fromObject = function fromObject(object) {
        if (object instanceof $root.Invite)
            return object;
        let message = new $root.Invite();
        if (object.channelPubKey != null)
            if (typeof object.channelPubKey === "string")
                $util.base64.decode(object.channelPubKey, message.channelPubKey = $util.newBuffer($util.base64.length(object.channelPubKey)), 0);
            else if (object.channelPubKey.length)
                message.channelPubKey = object.channelPubKey;
        if (object.channelName != null)
            message.channelName = String(object.channelName);
        if (object.chain) {
            if (!Array.isArray(object.chain))
                throw TypeError(".Invite.chain: array expected");
            message.chain = [];
            for (let i = 0; i < object.chain.length; ++i) {
                if (typeof object.chain[i] !== "object")
                    throw TypeError(".Invite.chain: object expected");
                message.chain[i] = $root.Link.fromObject(object.chain[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from an Invite message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Invite
     * @static
     * @param {Invite} message Invite
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Invite.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults)
            object.chain = [];
        if (options.defaults) {
            if (options.bytes === String)
                object.channelPubKey = "";
            else {
                object.channelPubKey = [];
                if (options.bytes !== Array)
                    object.channelPubKey = $util.newBuffer(object.channelPubKey);
            }
            object.channelName = "";
        }
        if (message.channelPubKey != null && message.hasOwnProperty("channelPubKey"))
            object.channelPubKey = options.bytes === String ? $util.base64.encode(message.channelPubKey, 0, message.channelPubKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.channelPubKey) : message.channelPubKey;
        if (message.channelName != null && message.hasOwnProperty("channelName"))
            object.channelName = message.channelName;
        if (message.chain && message.chain.length) {
            object.chain = [];
            for (let j = 0; j < message.chain.length; ++j)
                object.chain[j] = $root.Link.toObject(message.chain[j], options);
        }
        return object;
    };

    /**
     * Converts this Invite to JSON.
     * @function toJSON
     * @memberof Invite
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Invite.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Invite;
})();

export const EncryptedInvite = $root.EncryptedInvite = (() => {

    /**
     * Properties of an EncryptedInvite.
     * @exports IEncryptedInvite
     * @interface IEncryptedInvite
     * @property {Uint8Array|null} [requestId] EncryptedInvite requestId
     * @property {Uint8Array|null} [box] EncryptedInvite box
     */

    /**
     * Constructs a new EncryptedInvite.
     * @exports EncryptedInvite
     * @classdesc Represents an EncryptedInvite.
     * @implements IEncryptedInvite
     * @constructor
     * @param {IEncryptedInvite=} [properties] Properties to set
     */
    function EncryptedInvite(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * EncryptedInvite requestId.
     * @member {Uint8Array} requestId
     * @memberof EncryptedInvite
     * @instance
     */
    EncryptedInvite.prototype.requestId = $util.newBuffer([]);

    /**
     * EncryptedInvite box.
     * @member {Uint8Array} box
     * @memberof EncryptedInvite
     * @instance
     */
    EncryptedInvite.prototype.box = $util.newBuffer([]);

    /**
     * Creates a new EncryptedInvite instance using the specified properties.
     * @function create
     * @memberof EncryptedInvite
     * @static
     * @param {IEncryptedInvite=} [properties] Properties to set
     * @returns {EncryptedInvite} EncryptedInvite instance
     */
    EncryptedInvite.create = function create(properties) {
        return new EncryptedInvite(properties);
    };

    /**
     * Encodes the specified EncryptedInvite message. Does not implicitly {@link EncryptedInvite.verify|verify} messages.
     * @function encode
     * @memberof EncryptedInvite
     * @static
     * @param {IEncryptedInvite} message EncryptedInvite message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    EncryptedInvite.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.requestId != null && message.hasOwnProperty("requestId"))
            writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.requestId);
        if (message.box != null && message.hasOwnProperty("box"))
            writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.box);
        return writer;
    };

    /**
     * Encodes the specified EncryptedInvite message, length delimited. Does not implicitly {@link EncryptedInvite.verify|verify} messages.
     * @function encodeDelimited
     * @memberof EncryptedInvite
     * @static
     * @param {IEncryptedInvite} message EncryptedInvite message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    EncryptedInvite.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an EncryptedInvite message from the specified reader or buffer.
     * @function decode
     * @memberof EncryptedInvite
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {EncryptedInvite} EncryptedInvite
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    EncryptedInvite.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.EncryptedInvite();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.requestId = reader.bytes();
                break;
            case 2:
                message.box = reader.bytes();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an EncryptedInvite message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof EncryptedInvite
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {EncryptedInvite} EncryptedInvite
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    EncryptedInvite.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an EncryptedInvite message.
     * @function verify
     * @memberof EncryptedInvite
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    EncryptedInvite.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.requestId != null && message.hasOwnProperty("requestId"))
            if (!(message.requestId && typeof message.requestId.length === "number" || $util.isString(message.requestId)))
                return "requestId: buffer expected";
        if (message.box != null && message.hasOwnProperty("box"))
            if (!(message.box && typeof message.box.length === "number" || $util.isString(message.box)))
                return "box: buffer expected";
        return null;
    };

    /**
     * Creates an EncryptedInvite message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof EncryptedInvite
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {EncryptedInvite} EncryptedInvite
     */
    EncryptedInvite.fromObject = function fromObject(object) {
        if (object instanceof $root.EncryptedInvite)
            return object;
        let message = new $root.EncryptedInvite();
        if (object.requestId != null)
            if (typeof object.requestId === "string")
                $util.base64.decode(object.requestId, message.requestId = $util.newBuffer($util.base64.length(object.requestId)), 0);
            else if (object.requestId.length)
                message.requestId = object.requestId;
        if (object.box != null)
            if (typeof object.box === "string")
                $util.base64.decode(object.box, message.box = $util.newBuffer($util.base64.length(object.box)), 0);
            else if (object.box.length)
                message.box = object.box;
        return message;
    };

    /**
     * Creates a plain object from an EncryptedInvite message. Also converts values to other types if specified.
     * @function toObject
     * @memberof EncryptedInvite
     * @static
     * @param {EncryptedInvite} message EncryptedInvite
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    EncryptedInvite.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            if (options.bytes === String)
                object.requestId = "";
            else {
                object.requestId = [];
                if (options.bytes !== Array)
                    object.requestId = $util.newBuffer(object.requestId);
            }
            if (options.bytes === String)
                object.box = "";
            else {
                object.box = [];
                if (options.bytes !== Array)
                    object.box = $util.newBuffer(object.box);
            }
        }
        if (message.requestId != null && message.hasOwnProperty("requestId"))
            object.requestId = options.bytes === String ? $util.base64.encode(message.requestId, 0, message.requestId.length) : options.bytes === Array ? Array.prototype.slice.call(message.requestId) : message.requestId;
        if (message.box != null && message.hasOwnProperty("box"))
            object.box = options.bytes === String ? $util.base64.encode(message.box, 0, message.box.length) : options.bytes === Array ? Array.prototype.slice.call(message.box) : message.box;
        return object;
    };

    /**
     * Converts this EncryptedInvite to JSON.
     * @function toJSON
     * @memberof EncryptedInvite
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    EncryptedInvite.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return EncryptedInvite;
})();

export const InviteRequest = $root.InviteRequest = (() => {

    /**
     * Properties of an InviteRequest.
     * @exports IInviteRequest
     * @interface IInviteRequest
     * @property {Uint8Array|null} [peerId] InviteRequest peerId
     * @property {Uint8Array|null} [trusteePubKey] InviteRequest trusteePubKey
     * @property {Uint8Array|null} [boxPubKey] InviteRequest boxPubKey
     */

    /**
     * Constructs a new InviteRequest.
     * @exports InviteRequest
     * @classdesc Represents an InviteRequest.
     * @implements IInviteRequest
     * @constructor
     * @param {IInviteRequest=} [properties] Properties to set
     */
    function InviteRequest(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * InviteRequest peerId.
     * @member {Uint8Array} peerId
     * @memberof InviteRequest
     * @instance
     */
    InviteRequest.prototype.peerId = $util.newBuffer([]);

    /**
     * InviteRequest trusteePubKey.
     * @member {Uint8Array} trusteePubKey
     * @memberof InviteRequest
     * @instance
     */
    InviteRequest.prototype.trusteePubKey = $util.newBuffer([]);

    /**
     * InviteRequest boxPubKey.
     * @member {Uint8Array} boxPubKey
     * @memberof InviteRequest
     * @instance
     */
    InviteRequest.prototype.boxPubKey = $util.newBuffer([]);

    /**
     * Creates a new InviteRequest instance using the specified properties.
     * @function create
     * @memberof InviteRequest
     * @static
     * @param {IInviteRequest=} [properties] Properties to set
     * @returns {InviteRequest} InviteRequest instance
     */
    InviteRequest.create = function create(properties) {
        return new InviteRequest(properties);
    };

    /**
     * Encodes the specified InviteRequest message. Does not implicitly {@link InviteRequest.verify|verify} messages.
     * @function encode
     * @memberof InviteRequest
     * @static
     * @param {IInviteRequest} message InviteRequest message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    InviteRequest.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.peerId != null && message.hasOwnProperty("peerId"))
            writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.peerId);
        if (message.trusteePubKey != null && message.hasOwnProperty("trusteePubKey"))
            writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.trusteePubKey);
        if (message.boxPubKey != null && message.hasOwnProperty("boxPubKey"))
            writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.boxPubKey);
        return writer;
    };

    /**
     * Encodes the specified InviteRequest message, length delimited. Does not implicitly {@link InviteRequest.verify|verify} messages.
     * @function encodeDelimited
     * @memberof InviteRequest
     * @static
     * @param {IInviteRequest} message InviteRequest message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    InviteRequest.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an InviteRequest message from the specified reader or buffer.
     * @function decode
     * @memberof InviteRequest
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {InviteRequest} InviteRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    InviteRequest.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.InviteRequest();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.peerId = reader.bytes();
                break;
            case 2:
                message.trusteePubKey = reader.bytes();
                break;
            case 3:
                message.boxPubKey = reader.bytes();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an InviteRequest message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof InviteRequest
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {InviteRequest} InviteRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    InviteRequest.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an InviteRequest message.
     * @function verify
     * @memberof InviteRequest
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    InviteRequest.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.peerId != null && message.hasOwnProperty("peerId"))
            if (!(message.peerId && typeof message.peerId.length === "number" || $util.isString(message.peerId)))
                return "peerId: buffer expected";
        if (message.trusteePubKey != null && message.hasOwnProperty("trusteePubKey"))
            if (!(message.trusteePubKey && typeof message.trusteePubKey.length === "number" || $util.isString(message.trusteePubKey)))
                return "trusteePubKey: buffer expected";
        if (message.boxPubKey != null && message.hasOwnProperty("boxPubKey"))
            if (!(message.boxPubKey && typeof message.boxPubKey.length === "number" || $util.isString(message.boxPubKey)))
                return "boxPubKey: buffer expected";
        return null;
    };

    /**
     * Creates an InviteRequest message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof InviteRequest
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {InviteRequest} InviteRequest
     */
    InviteRequest.fromObject = function fromObject(object) {
        if (object instanceof $root.InviteRequest)
            return object;
        let message = new $root.InviteRequest();
        if (object.peerId != null)
            if (typeof object.peerId === "string")
                $util.base64.decode(object.peerId, message.peerId = $util.newBuffer($util.base64.length(object.peerId)), 0);
            else if (object.peerId.length)
                message.peerId = object.peerId;
        if (object.trusteePubKey != null)
            if (typeof object.trusteePubKey === "string")
                $util.base64.decode(object.trusteePubKey, message.trusteePubKey = $util.newBuffer($util.base64.length(object.trusteePubKey)), 0);
            else if (object.trusteePubKey.length)
                message.trusteePubKey = object.trusteePubKey;
        if (object.boxPubKey != null)
            if (typeof object.boxPubKey === "string")
                $util.base64.decode(object.boxPubKey, message.boxPubKey = $util.newBuffer($util.base64.length(object.boxPubKey)), 0);
            else if (object.boxPubKey.length)
                message.boxPubKey = object.boxPubKey;
        return message;
    };

    /**
     * Creates a plain object from an InviteRequest message. Also converts values to other types if specified.
     * @function toObject
     * @memberof InviteRequest
     * @static
     * @param {InviteRequest} message InviteRequest
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    InviteRequest.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            if (options.bytes === String)
                object.peerId = "";
            else {
                object.peerId = [];
                if (options.bytes !== Array)
                    object.peerId = $util.newBuffer(object.peerId);
            }
            if (options.bytes === String)
                object.trusteePubKey = "";
            else {
                object.trusteePubKey = [];
                if (options.bytes !== Array)
                    object.trusteePubKey = $util.newBuffer(object.trusteePubKey);
            }
            if (options.bytes === String)
                object.boxPubKey = "";
            else {
                object.boxPubKey = [];
                if (options.bytes !== Array)
                    object.boxPubKey = $util.newBuffer(object.boxPubKey);
            }
        }
        if (message.peerId != null && message.hasOwnProperty("peerId"))
            object.peerId = options.bytes === String ? $util.base64.encode(message.peerId, 0, message.peerId.length) : options.bytes === Array ? Array.prototype.slice.call(message.peerId) : message.peerId;
        if (message.trusteePubKey != null && message.hasOwnProperty("trusteePubKey"))
            object.trusteePubKey = options.bytes === String ? $util.base64.encode(message.trusteePubKey, 0, message.trusteePubKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.trusteePubKey) : message.trusteePubKey;
        if (message.boxPubKey != null && message.hasOwnProperty("boxPubKey"))
            object.boxPubKey = options.bytes === String ? $util.base64.encode(message.boxPubKey, 0, message.boxPubKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.boxPubKey) : message.boxPubKey;
        return object;
    };

    /**
     * Converts this InviteRequest to JSON.
     * @function toJSON
     * @memberof InviteRequest
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    InviteRequest.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return InviteRequest;
})();

export const ChannelMessage = $root.ChannelMessage = (() => {

    /**
     * Properties of a ChannelMessage.
     * @exports IChannelMessage
     * @interface IChannelMessage
     * @property {ChannelMessage.ITBS|null} [tbs] ChannelMessage tbs
     * @property {Uint8Array|null} [signature] ChannelMessage signature
     */

    /**
     * Constructs a new ChannelMessage.
     * @exports ChannelMessage
     * @classdesc Represents a ChannelMessage.
     * @implements IChannelMessage
     * @constructor
     * @param {IChannelMessage=} [properties] Properties to set
     */
    function ChannelMessage(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ChannelMessage tbs.
     * @member {ChannelMessage.ITBS|null|undefined} tbs
     * @memberof ChannelMessage
     * @instance
     */
    ChannelMessage.prototype.tbs = null;

    /**
     * ChannelMessage signature.
     * @member {Uint8Array} signature
     * @memberof ChannelMessage
     * @instance
     */
    ChannelMessage.prototype.signature = $util.newBuffer([]);

    /**
     * Creates a new ChannelMessage instance using the specified properties.
     * @function create
     * @memberof ChannelMessage
     * @static
     * @param {IChannelMessage=} [properties] Properties to set
     * @returns {ChannelMessage} ChannelMessage instance
     */
    ChannelMessage.create = function create(properties) {
        return new ChannelMessage(properties);
    };

    /**
     * Encodes the specified ChannelMessage message. Does not implicitly {@link ChannelMessage.verify|verify} messages.
     * @function encode
     * @memberof ChannelMessage
     * @static
     * @param {IChannelMessage} message ChannelMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ChannelMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.tbs != null && message.hasOwnProperty("tbs"))
            $root.ChannelMessage.TBS.encode(message.tbs, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.signature != null && message.hasOwnProperty("signature"))
            writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.signature);
        return writer;
    };

    /**
     * Encodes the specified ChannelMessage message, length delimited. Does not implicitly {@link ChannelMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ChannelMessage
     * @static
     * @param {IChannelMessage} message ChannelMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ChannelMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a ChannelMessage message from the specified reader or buffer.
     * @function decode
     * @memberof ChannelMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ChannelMessage} ChannelMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ChannelMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.ChannelMessage();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.tbs = $root.ChannelMessage.TBS.decode(reader, reader.uint32());
                break;
            case 2:
                message.signature = reader.bytes();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a ChannelMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ChannelMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ChannelMessage} ChannelMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ChannelMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a ChannelMessage message.
     * @function verify
     * @memberof ChannelMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ChannelMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.tbs != null && message.hasOwnProperty("tbs")) {
            let error = $root.ChannelMessage.TBS.verify(message.tbs);
            if (error)
                return "tbs." + error;
        }
        if (message.signature != null && message.hasOwnProperty("signature"))
            if (!(message.signature && typeof message.signature.length === "number" || $util.isString(message.signature)))
                return "signature: buffer expected";
        return null;
    };

    /**
     * Creates a ChannelMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ChannelMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ChannelMessage} ChannelMessage
     */
    ChannelMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.ChannelMessage)
            return object;
        let message = new $root.ChannelMessage();
        if (object.tbs != null) {
            if (typeof object.tbs !== "object")
                throw TypeError(".ChannelMessage.tbs: object expected");
            message.tbs = $root.ChannelMessage.TBS.fromObject(object.tbs);
        }
        if (object.signature != null)
            if (typeof object.signature === "string")
                $util.base64.decode(object.signature, message.signature = $util.newBuffer($util.base64.length(object.signature)), 0);
            else if (object.signature.length)
                message.signature = object.signature;
        return message;
    };

    /**
     * Creates a plain object from a ChannelMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ChannelMessage
     * @static
     * @param {ChannelMessage} message ChannelMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ChannelMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.tbs = null;
            if (options.bytes === String)
                object.signature = "";
            else {
                object.signature = [];
                if (options.bytes !== Array)
                    object.signature = $util.newBuffer(object.signature);
            }
        }
        if (message.tbs != null && message.hasOwnProperty("tbs"))
            object.tbs = $root.ChannelMessage.TBS.toObject(message.tbs, options);
        if (message.signature != null && message.hasOwnProperty("signature"))
            object.signature = options.bytes === String ? $util.base64.encode(message.signature, 0, message.signature.length) : options.bytes === Array ? Array.prototype.slice.call(message.signature) : message.signature;
        return object;
    };

    /**
     * Converts this ChannelMessage to JSON.
     * @function toJSON
     * @memberof ChannelMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ChannelMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    ChannelMessage.Root = (function() {

        /**
         * Properties of a Root.
         * @memberof ChannelMessage
         * @interface IRoot
         */

        /**
         * Constructs a new Root.
         * @memberof ChannelMessage
         * @classdesc Represents a Root.
         * @implements IRoot
         * @constructor
         * @param {ChannelMessage.IRoot=} [properties] Properties to set
         */
        function Root(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new Root instance using the specified properties.
         * @function create
         * @memberof ChannelMessage.Root
         * @static
         * @param {ChannelMessage.IRoot=} [properties] Properties to set
         * @returns {ChannelMessage.Root} Root instance
         */
        Root.create = function create(properties) {
            return new Root(properties);
        };

        /**
         * Encodes the specified Root message. Does not implicitly {@link ChannelMessage.Root.verify|verify} messages.
         * @function encode
         * @memberof ChannelMessage.Root
         * @static
         * @param {ChannelMessage.IRoot} message Root message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Root.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified Root message, length delimited. Does not implicitly {@link ChannelMessage.Root.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ChannelMessage.Root
         * @static
         * @param {ChannelMessage.IRoot} message Root message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Root.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Root message from the specified reader or buffer.
         * @function decode
         * @memberof ChannelMessage.Root
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ChannelMessage.Root} Root
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Root.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.ChannelMessage.Root();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Root message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ChannelMessage.Root
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ChannelMessage.Root} Root
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Root.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Root message.
         * @function verify
         * @memberof ChannelMessage.Root
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Root.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a Root message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ChannelMessage.Root
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ChannelMessage.Root} Root
         */
        Root.fromObject = function fromObject(object) {
            if (object instanceof $root.ChannelMessage.Root)
                return object;
            return new $root.ChannelMessage.Root();
        };

        /**
         * Creates a plain object from a Root message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ChannelMessage.Root
         * @static
         * @param {ChannelMessage.Root} message Root
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Root.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this Root to JSON.
         * @function toJSON
         * @memberof ChannelMessage.Root
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Root.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Root;
    })();

    ChannelMessage.Body = (function() {

        /**
         * Properties of a Body.
         * @memberof ChannelMessage
         * @interface IBody
         * @property {ChannelMessage.IRoot|null} [root] Body root
         * @property {string|null} [json] Body json
         */

        /**
         * Constructs a new Body.
         * @memberof ChannelMessage
         * @classdesc Represents a Body.
         * @implements IBody
         * @constructor
         * @param {ChannelMessage.IBody=} [properties] Properties to set
         */
        function Body(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Body root.
         * @member {ChannelMessage.IRoot|null|undefined} root
         * @memberof ChannelMessage.Body
         * @instance
         */
        Body.prototype.root = null;

        /**
         * Body json.
         * @member {string} json
         * @memberof ChannelMessage.Body
         * @instance
         */
        Body.prototype.json = "";

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * Body body.
         * @member {"root"|"json"|undefined} body
         * @memberof ChannelMessage.Body
         * @instance
         */
        Object.defineProperty(Body.prototype, "body", {
            get: $util.oneOfGetter($oneOfFields = ["root", "json"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new Body instance using the specified properties.
         * @function create
         * @memberof ChannelMessage.Body
         * @static
         * @param {ChannelMessage.IBody=} [properties] Properties to set
         * @returns {ChannelMessage.Body} Body instance
         */
        Body.create = function create(properties) {
            return new Body(properties);
        };

        /**
         * Encodes the specified Body message. Does not implicitly {@link ChannelMessage.Body.verify|verify} messages.
         * @function encode
         * @memberof ChannelMessage.Body
         * @static
         * @param {ChannelMessage.IBody} message Body message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Body.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.root != null && message.hasOwnProperty("root"))
                $root.ChannelMessage.Root.encode(message.root, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.json != null && message.hasOwnProperty("json"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.json);
            return writer;
        };

        /**
         * Encodes the specified Body message, length delimited. Does not implicitly {@link ChannelMessage.Body.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ChannelMessage.Body
         * @static
         * @param {ChannelMessage.IBody} message Body message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Body.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Body message from the specified reader or buffer.
         * @function decode
         * @memberof ChannelMessage.Body
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ChannelMessage.Body} Body
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Body.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.ChannelMessage.Body();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.root = $root.ChannelMessage.Root.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.json = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Body message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ChannelMessage.Body
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ChannelMessage.Body} Body
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Body.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Body message.
         * @function verify
         * @memberof ChannelMessage.Body
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Body.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            let properties = {};
            if (message.root != null && message.hasOwnProperty("root")) {
                properties.body = 1;
                {
                    let error = $root.ChannelMessage.Root.verify(message.root);
                    if (error)
                        return "root." + error;
                }
            }
            if (message.json != null && message.hasOwnProperty("json")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                if (!$util.isString(message.json))
                    return "json: string expected";
            }
            return null;
        };

        /**
         * Creates a Body message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ChannelMessage.Body
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ChannelMessage.Body} Body
         */
        Body.fromObject = function fromObject(object) {
            if (object instanceof $root.ChannelMessage.Body)
                return object;
            let message = new $root.ChannelMessage.Body();
            if (object.root != null) {
                if (typeof object.root !== "object")
                    throw TypeError(".ChannelMessage.Body.root: object expected");
                message.root = $root.ChannelMessage.Root.fromObject(object.root);
            }
            if (object.json != null)
                message.json = String(object.json);
            return message;
        };

        /**
         * Creates a plain object from a Body message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ChannelMessage.Body
         * @static
         * @param {ChannelMessage.Body} message Body
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Body.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (message.root != null && message.hasOwnProperty("root")) {
                object.root = $root.ChannelMessage.Root.toObject(message.root, options);
                if (options.oneofs)
                    object.body = "root";
            }
            if (message.json != null && message.hasOwnProperty("json")) {
                object.json = message.json;
                if (options.oneofs)
                    object.body = "json";
            }
            return object;
        };

        /**
         * Converts this Body to JSON.
         * @function toJSON
         * @memberof ChannelMessage.Body
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Body.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Body;
    })();

    ChannelMessage.TBS = (function() {

        /**
         * Properties of a TBS.
         * @memberof ChannelMessage
         * @interface ITBS
         * @property {Array.<Uint8Array>|null} [parents] TBS parents
         * @property {number|Long|null} [height] TBS height
         * @property {Array.<ILink>|null} [chain] TBS chain
         * @property {number|null} [timestamp] TBS timestamp
         * @property {ChannelMessage.IBody|null} [body] TBS body
         */

        /**
         * Constructs a new TBS.
         * @memberof ChannelMessage
         * @classdesc Represents a TBS.
         * @implements ITBS
         * @constructor
         * @param {ChannelMessage.ITBS=} [properties] Properties to set
         */
        function TBS(properties) {
            this.parents = [];
            this.chain = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TBS parents.
         * @member {Array.<Uint8Array>} parents
         * @memberof ChannelMessage.TBS
         * @instance
         */
        TBS.prototype.parents = $util.emptyArray;

        /**
         * TBS height.
         * @member {number|Long} height
         * @memberof ChannelMessage.TBS
         * @instance
         */
        TBS.prototype.height = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * TBS chain.
         * @member {Array.<ILink>} chain
         * @memberof ChannelMessage.TBS
         * @instance
         */
        TBS.prototype.chain = $util.emptyArray;

        /**
         * TBS timestamp.
         * @member {number} timestamp
         * @memberof ChannelMessage.TBS
         * @instance
         */
        TBS.prototype.timestamp = 0;

        /**
         * TBS body.
         * @member {ChannelMessage.IBody|null|undefined} body
         * @memberof ChannelMessage.TBS
         * @instance
         */
        TBS.prototype.body = null;

        /**
         * Creates a new TBS instance using the specified properties.
         * @function create
         * @memberof ChannelMessage.TBS
         * @static
         * @param {ChannelMessage.ITBS=} [properties] Properties to set
         * @returns {ChannelMessage.TBS} TBS instance
         */
        TBS.create = function create(properties) {
            return new TBS(properties);
        };

        /**
         * Encodes the specified TBS message. Does not implicitly {@link ChannelMessage.TBS.verify|verify} messages.
         * @function encode
         * @memberof ChannelMessage.TBS
         * @static
         * @param {ChannelMessage.ITBS} message TBS message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TBS.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.parents != null && message.parents.length)
                for (let i = 0; i < message.parents.length; ++i)
                    writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.parents[i]);
            if (message.height != null && message.hasOwnProperty("height"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.height);
            if (message.chain != null && message.chain.length)
                for (let i = 0; i < message.chain.length; ++i)
                    $root.Link.encode(message.chain[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                writer.uint32(/* id 4, wireType 1 =*/33).double(message.timestamp);
            if (message.body != null && message.hasOwnProperty("body"))
                $root.ChannelMessage.Body.encode(message.body, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified TBS message, length delimited. Does not implicitly {@link ChannelMessage.TBS.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ChannelMessage.TBS
         * @static
         * @param {ChannelMessage.ITBS} message TBS message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TBS.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TBS message from the specified reader or buffer.
         * @function decode
         * @memberof ChannelMessage.TBS
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ChannelMessage.TBS} TBS
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TBS.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.ChannelMessage.TBS();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.parents && message.parents.length))
                        message.parents = [];
                    message.parents.push(reader.bytes());
                    break;
                case 2:
                    message.height = reader.int64();
                    break;
                case 3:
                    if (!(message.chain && message.chain.length))
                        message.chain = [];
                    message.chain.push($root.Link.decode(reader, reader.uint32()));
                    break;
                case 4:
                    message.timestamp = reader.double();
                    break;
                case 5:
                    message.body = $root.ChannelMessage.Body.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a TBS message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ChannelMessage.TBS
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ChannelMessage.TBS} TBS
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TBS.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TBS message.
         * @function verify
         * @memberof ChannelMessage.TBS
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TBS.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.parents != null && message.hasOwnProperty("parents")) {
                if (!Array.isArray(message.parents))
                    return "parents: array expected";
                for (let i = 0; i < message.parents.length; ++i)
                    if (!(message.parents[i] && typeof message.parents[i].length === "number" || $util.isString(message.parents[i])))
                        return "parents: buffer[] expected";
            }
            if (message.height != null && message.hasOwnProperty("height"))
                if (!$util.isInteger(message.height) && !(message.height && $util.isInteger(message.height.low) && $util.isInteger(message.height.high)))
                    return "height: integer|Long expected";
            if (message.chain != null && message.hasOwnProperty("chain")) {
                if (!Array.isArray(message.chain))
                    return "chain: array expected";
                for (let i = 0; i < message.chain.length; ++i) {
                    let error = $root.Link.verify(message.chain[i]);
                    if (error)
                        return "chain." + error;
                }
            }
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (typeof message.timestamp !== "number")
                    return "timestamp: number expected";
            if (message.body != null && message.hasOwnProperty("body")) {
                let error = $root.ChannelMessage.Body.verify(message.body);
                if (error)
                    return "body." + error;
            }
            return null;
        };

        /**
         * Creates a TBS message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ChannelMessage.TBS
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ChannelMessage.TBS} TBS
         */
        TBS.fromObject = function fromObject(object) {
            if (object instanceof $root.ChannelMessage.TBS)
                return object;
            let message = new $root.ChannelMessage.TBS();
            if (object.parents) {
                if (!Array.isArray(object.parents))
                    throw TypeError(".ChannelMessage.TBS.parents: array expected");
                message.parents = [];
                for (let i = 0; i < object.parents.length; ++i)
                    if (typeof object.parents[i] === "string")
                        $util.base64.decode(object.parents[i], message.parents[i] = $util.newBuffer($util.base64.length(object.parents[i])), 0);
                    else if (object.parents[i].length)
                        message.parents[i] = object.parents[i];
            }
            if (object.height != null)
                if ($util.Long)
                    (message.height = $util.Long.fromValue(object.height)).unsigned = false;
                else if (typeof object.height === "string")
                    message.height = parseInt(object.height, 10);
                else if (typeof object.height === "number")
                    message.height = object.height;
                else if (typeof object.height === "object")
                    message.height = new $util.LongBits(object.height.low >>> 0, object.height.high >>> 0).toNumber();
            if (object.chain) {
                if (!Array.isArray(object.chain))
                    throw TypeError(".ChannelMessage.TBS.chain: array expected");
                message.chain = [];
                for (let i = 0; i < object.chain.length; ++i) {
                    if (typeof object.chain[i] !== "object")
                        throw TypeError(".ChannelMessage.TBS.chain: object expected");
                    message.chain[i] = $root.Link.fromObject(object.chain[i]);
                }
            }
            if (object.timestamp != null)
                message.timestamp = Number(object.timestamp);
            if (object.body != null) {
                if (typeof object.body !== "object")
                    throw TypeError(".ChannelMessage.TBS.body: object expected");
                message.body = $root.ChannelMessage.Body.fromObject(object.body);
            }
            return message;
        };

        /**
         * Creates a plain object from a TBS message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ChannelMessage.TBS
         * @static
         * @param {ChannelMessage.TBS} message TBS
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TBS.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults) {
                object.parents = [];
                object.chain = [];
            }
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.height = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.height = options.longs === String ? "0" : 0;
                object.timestamp = 0;
                object.body = null;
            }
            if (message.parents && message.parents.length) {
                object.parents = [];
                for (let j = 0; j < message.parents.length; ++j)
                    object.parents[j] = options.bytes === String ? $util.base64.encode(message.parents[j], 0, message.parents[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.parents[j]) : message.parents[j];
            }
            if (message.height != null && message.hasOwnProperty("height"))
                if (typeof message.height === "number")
                    object.height = options.longs === String ? String(message.height) : message.height;
                else
                    object.height = options.longs === String ? $util.Long.prototype.toString.call(message.height) : options.longs === Number ? new $util.LongBits(message.height.low >>> 0, message.height.high >>> 0).toNumber() : message.height;
            if (message.chain && message.chain.length) {
                object.chain = [];
                for (let j = 0; j < message.chain.length; ++j)
                    object.chain[j] = $root.Link.toObject(message.chain[j], options);
            }
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                object.timestamp = options.json && !isFinite(message.timestamp) ? String(message.timestamp) : message.timestamp;
            if (message.body != null && message.hasOwnProperty("body"))
                object.body = $root.ChannelMessage.Body.toObject(message.body, options);
            return object;
        };

        /**
         * Converts this TBS to JSON.
         * @function toJSON
         * @memberof ChannelMessage.TBS
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TBS.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return TBS;
    })();

    return ChannelMessage;
})();

export const Query = $root.Query = (() => {

    /**
     * Properties of a Query.
     * @exports IQuery
     * @interface IQuery
     * @property {number|Long|null} [height] Query height
     * @property {Uint8Array|null} [hash] Query hash
     * @property {boolean|null} [isBackward] Query isBackward
     * @property {number|null} [limit] Query limit
     */

    /**
     * Constructs a new Query.
     * @exports Query
     * @classdesc Represents a Query.
     * @implements IQuery
     * @constructor
     * @param {IQuery=} [properties] Properties to set
     */
    function Query(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Query height.
     * @member {number|Long} height
     * @memberof Query
     * @instance
     */
    Query.prototype.height = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Query hash.
     * @member {Uint8Array} hash
     * @memberof Query
     * @instance
     */
    Query.prototype.hash = $util.newBuffer([]);

    /**
     * Query isBackward.
     * @member {boolean} isBackward
     * @memberof Query
     * @instance
     */
    Query.prototype.isBackward = false;

    /**
     * Query limit.
     * @member {number} limit
     * @memberof Query
     * @instance
     */
    Query.prototype.limit = 0;

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields;

    /**
     * Query cursor.
     * @member {"height"|"hash"|undefined} cursor
     * @memberof Query
     * @instance
     */
    Object.defineProperty(Query.prototype, "cursor", {
        get: $util.oneOfGetter($oneOfFields = ["height", "hash"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new Query instance using the specified properties.
     * @function create
     * @memberof Query
     * @static
     * @param {IQuery=} [properties] Properties to set
     * @returns {Query} Query instance
     */
    Query.create = function create(properties) {
        return new Query(properties);
    };

    /**
     * Encodes the specified Query message. Does not implicitly {@link Query.verify|verify} messages.
     * @function encode
     * @memberof Query
     * @static
     * @param {IQuery} message Query message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Query.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.height != null && message.hasOwnProperty("height"))
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.height);
        if (message.hash != null && message.hasOwnProperty("hash"))
            writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.hash);
        if (message.isBackward != null && message.hasOwnProperty("isBackward"))
            writer.uint32(/* id 3, wireType 0 =*/24).bool(message.isBackward);
        if (message.limit != null && message.hasOwnProperty("limit"))
            writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.limit);
        return writer;
    };

    /**
     * Encodes the specified Query message, length delimited. Does not implicitly {@link Query.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Query
     * @static
     * @param {IQuery} message Query message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Query.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Query message from the specified reader or buffer.
     * @function decode
     * @memberof Query
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Query} Query
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Query.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Query();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.height = reader.int64();
                break;
            case 2:
                message.hash = reader.bytes();
                break;
            case 3:
                message.isBackward = reader.bool();
                break;
            case 4:
                message.limit = reader.uint32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Query message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Query
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Query} Query
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Query.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Query message.
     * @function verify
     * @memberof Query
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Query.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        let properties = {};
        if (message.height != null && message.hasOwnProperty("height")) {
            properties.cursor = 1;
            if (!$util.isInteger(message.height) && !(message.height && $util.isInteger(message.height.low) && $util.isInteger(message.height.high)))
                return "height: integer|Long expected";
        }
        if (message.hash != null && message.hasOwnProperty("hash")) {
            if (properties.cursor === 1)
                return "cursor: multiple values";
            properties.cursor = 1;
            if (!(message.hash && typeof message.hash.length === "number" || $util.isString(message.hash)))
                return "hash: buffer expected";
        }
        if (message.isBackward != null && message.hasOwnProperty("isBackward"))
            if (typeof message.isBackward !== "boolean")
                return "isBackward: boolean expected";
        if (message.limit != null && message.hasOwnProperty("limit"))
            if (!$util.isInteger(message.limit))
                return "limit: integer expected";
        return null;
    };

    /**
     * Creates a Query message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Query
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Query} Query
     */
    Query.fromObject = function fromObject(object) {
        if (object instanceof $root.Query)
            return object;
        let message = new $root.Query();
        if (object.height != null)
            if ($util.Long)
                (message.height = $util.Long.fromValue(object.height)).unsigned = false;
            else if (typeof object.height === "string")
                message.height = parseInt(object.height, 10);
            else if (typeof object.height === "number")
                message.height = object.height;
            else if (typeof object.height === "object")
                message.height = new $util.LongBits(object.height.low >>> 0, object.height.high >>> 0).toNumber();
        if (object.hash != null)
            if (typeof object.hash === "string")
                $util.base64.decode(object.hash, message.hash = $util.newBuffer($util.base64.length(object.hash)), 0);
            else if (object.hash.length)
                message.hash = object.hash;
        if (object.isBackward != null)
            message.isBackward = Boolean(object.isBackward);
        if (object.limit != null)
            message.limit = object.limit >>> 0;
        return message;
    };

    /**
     * Creates a plain object from a Query message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Query
     * @static
     * @param {Query} message Query
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Query.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.isBackward = false;
            object.limit = 0;
        }
        if (message.height != null && message.hasOwnProperty("height")) {
            if (typeof message.height === "number")
                object.height = options.longs === String ? String(message.height) : message.height;
            else
                object.height = options.longs === String ? $util.Long.prototype.toString.call(message.height) : options.longs === Number ? new $util.LongBits(message.height.low >>> 0, message.height.high >>> 0).toNumber() : message.height;
            if (options.oneofs)
                object.cursor = "height";
        }
        if (message.hash != null && message.hasOwnProperty("hash")) {
            object.hash = options.bytes === String ? $util.base64.encode(message.hash, 0, message.hash.length) : options.bytes === Array ? Array.prototype.slice.call(message.hash) : message.hash;
            if (options.oneofs)
                object.cursor = "hash";
        }
        if (message.isBackward != null && message.hasOwnProperty("isBackward"))
            object.isBackward = message.isBackward;
        if (message.limit != null && message.hasOwnProperty("limit"))
            object.limit = message.limit;
        return object;
    };

    /**
     * Converts this Query to JSON.
     * @function toJSON
     * @memberof Query
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Query.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Query;
})();

export const QueryResponse = $root.QueryResponse = (() => {

    /**
     * Properties of a QueryResponse.
     * @exports IQueryResponse
     * @interface IQueryResponse
     * @property {Array.<QueryResponse.IAbbreviated>|null} [abbreviatedMessages] QueryResponse abbreviatedMessages
     * @property {Uint8Array|null} [forwardHash] QueryResponse forwardHash
     * @property {Uint8Array|null} [backwardHash] QueryResponse backwardHash
     */

    /**
     * Constructs a new QueryResponse.
     * @exports QueryResponse
     * @classdesc Represents a QueryResponse.
     * @implements IQueryResponse
     * @constructor
     * @param {IQueryResponse=} [properties] Properties to set
     */
    function QueryResponse(properties) {
        this.abbreviatedMessages = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * QueryResponse abbreviatedMessages.
     * @member {Array.<QueryResponse.IAbbreviated>} abbreviatedMessages
     * @memberof QueryResponse
     * @instance
     */
    QueryResponse.prototype.abbreviatedMessages = $util.emptyArray;

    /**
     * QueryResponse forwardHash.
     * @member {Uint8Array} forwardHash
     * @memberof QueryResponse
     * @instance
     */
    QueryResponse.prototype.forwardHash = $util.newBuffer([]);

    /**
     * QueryResponse backwardHash.
     * @member {Uint8Array} backwardHash
     * @memberof QueryResponse
     * @instance
     */
    QueryResponse.prototype.backwardHash = $util.newBuffer([]);

    /**
     * Creates a new QueryResponse instance using the specified properties.
     * @function create
     * @memberof QueryResponse
     * @static
     * @param {IQueryResponse=} [properties] Properties to set
     * @returns {QueryResponse} QueryResponse instance
     */
    QueryResponse.create = function create(properties) {
        return new QueryResponse(properties);
    };

    /**
     * Encodes the specified QueryResponse message. Does not implicitly {@link QueryResponse.verify|verify} messages.
     * @function encode
     * @memberof QueryResponse
     * @static
     * @param {IQueryResponse} message QueryResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    QueryResponse.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.abbreviatedMessages != null && message.abbreviatedMessages.length)
            for (let i = 0; i < message.abbreviatedMessages.length; ++i)
                $root.QueryResponse.Abbreviated.encode(message.abbreviatedMessages[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.forwardHash != null && message.hasOwnProperty("forwardHash"))
            writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.forwardHash);
        if (message.backwardHash != null && message.hasOwnProperty("backwardHash"))
            writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.backwardHash);
        return writer;
    };

    /**
     * Encodes the specified QueryResponse message, length delimited. Does not implicitly {@link QueryResponse.verify|verify} messages.
     * @function encodeDelimited
     * @memberof QueryResponse
     * @static
     * @param {IQueryResponse} message QueryResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    QueryResponse.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a QueryResponse message from the specified reader or buffer.
     * @function decode
     * @memberof QueryResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {QueryResponse} QueryResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    QueryResponse.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.QueryResponse();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.abbreviatedMessages && message.abbreviatedMessages.length))
                    message.abbreviatedMessages = [];
                message.abbreviatedMessages.push($root.QueryResponse.Abbreviated.decode(reader, reader.uint32()));
                break;
            case 2:
                message.forwardHash = reader.bytes();
                break;
            case 3:
                message.backwardHash = reader.bytes();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a QueryResponse message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof QueryResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {QueryResponse} QueryResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    QueryResponse.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a QueryResponse message.
     * @function verify
     * @memberof QueryResponse
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    QueryResponse.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.abbreviatedMessages != null && message.hasOwnProperty("abbreviatedMessages")) {
            if (!Array.isArray(message.abbreviatedMessages))
                return "abbreviatedMessages: array expected";
            for (let i = 0; i < message.abbreviatedMessages.length; ++i) {
                let error = $root.QueryResponse.Abbreviated.verify(message.abbreviatedMessages[i]);
                if (error)
                    return "abbreviatedMessages." + error;
            }
        }
        if (message.forwardHash != null && message.hasOwnProperty("forwardHash"))
            if (!(message.forwardHash && typeof message.forwardHash.length === "number" || $util.isString(message.forwardHash)))
                return "forwardHash: buffer expected";
        if (message.backwardHash != null && message.hasOwnProperty("backwardHash"))
            if (!(message.backwardHash && typeof message.backwardHash.length === "number" || $util.isString(message.backwardHash)))
                return "backwardHash: buffer expected";
        return null;
    };

    /**
     * Creates a QueryResponse message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof QueryResponse
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {QueryResponse} QueryResponse
     */
    QueryResponse.fromObject = function fromObject(object) {
        if (object instanceof $root.QueryResponse)
            return object;
        let message = new $root.QueryResponse();
        if (object.abbreviatedMessages) {
            if (!Array.isArray(object.abbreviatedMessages))
                throw TypeError(".QueryResponse.abbreviatedMessages: array expected");
            message.abbreviatedMessages = [];
            for (let i = 0; i < object.abbreviatedMessages.length; ++i) {
                if (typeof object.abbreviatedMessages[i] !== "object")
                    throw TypeError(".QueryResponse.abbreviatedMessages: object expected");
                message.abbreviatedMessages[i] = $root.QueryResponse.Abbreviated.fromObject(object.abbreviatedMessages[i]);
            }
        }
        if (object.forwardHash != null)
            if (typeof object.forwardHash === "string")
                $util.base64.decode(object.forwardHash, message.forwardHash = $util.newBuffer($util.base64.length(object.forwardHash)), 0);
            else if (object.forwardHash.length)
                message.forwardHash = object.forwardHash;
        if (object.backwardHash != null)
            if (typeof object.backwardHash === "string")
                $util.base64.decode(object.backwardHash, message.backwardHash = $util.newBuffer($util.base64.length(object.backwardHash)), 0);
            else if (object.backwardHash.length)
                message.backwardHash = object.backwardHash;
        return message;
    };

    /**
     * Creates a plain object from a QueryResponse message. Also converts values to other types if specified.
     * @function toObject
     * @memberof QueryResponse
     * @static
     * @param {QueryResponse} message QueryResponse
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    QueryResponse.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults)
            object.abbreviatedMessages = [];
        if (options.defaults) {
            if (options.bytes === String)
                object.forwardHash = "";
            else {
                object.forwardHash = [];
                if (options.bytes !== Array)
                    object.forwardHash = $util.newBuffer(object.forwardHash);
            }
            if (options.bytes === String)
                object.backwardHash = "";
            else {
                object.backwardHash = [];
                if (options.bytes !== Array)
                    object.backwardHash = $util.newBuffer(object.backwardHash);
            }
        }
        if (message.abbreviatedMessages && message.abbreviatedMessages.length) {
            object.abbreviatedMessages = [];
            for (let j = 0; j < message.abbreviatedMessages.length; ++j)
                object.abbreviatedMessages[j] = $root.QueryResponse.Abbreviated.toObject(message.abbreviatedMessages[j], options);
        }
        if (message.forwardHash != null && message.hasOwnProperty("forwardHash"))
            object.forwardHash = options.bytes === String ? $util.base64.encode(message.forwardHash, 0, message.forwardHash.length) : options.bytes === Array ? Array.prototype.slice.call(message.forwardHash) : message.forwardHash;
        if (message.backwardHash != null && message.hasOwnProperty("backwardHash"))
            object.backwardHash = options.bytes === String ? $util.base64.encode(message.backwardHash, 0, message.backwardHash.length) : options.bytes === Array ? Array.prototype.slice.call(message.backwardHash) : message.backwardHash;
        return object;
    };

    /**
     * Converts this QueryResponse to JSON.
     * @function toJSON
     * @memberof QueryResponse
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    QueryResponse.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    QueryResponse.Abbreviated = (function() {

        /**
         * Properties of an Abbreviated.
         * @memberof QueryResponse
         * @interface IAbbreviated
         * @property {Array.<Uint8Array>|null} [parents] Abbreviated parents
         * @property {Uint8Array|null} [hash] Abbreviated hash
         */

        /**
         * Constructs a new Abbreviated.
         * @memberof QueryResponse
         * @classdesc Represents an Abbreviated.
         * @implements IAbbreviated
         * @constructor
         * @param {QueryResponse.IAbbreviated=} [properties] Properties to set
         */
        function Abbreviated(properties) {
            this.parents = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Abbreviated parents.
         * @member {Array.<Uint8Array>} parents
         * @memberof QueryResponse.Abbreviated
         * @instance
         */
        Abbreviated.prototype.parents = $util.emptyArray;

        /**
         * Abbreviated hash.
         * @member {Uint8Array} hash
         * @memberof QueryResponse.Abbreviated
         * @instance
         */
        Abbreviated.prototype.hash = $util.newBuffer([]);

        /**
         * Creates a new Abbreviated instance using the specified properties.
         * @function create
         * @memberof QueryResponse.Abbreviated
         * @static
         * @param {QueryResponse.IAbbreviated=} [properties] Properties to set
         * @returns {QueryResponse.Abbreviated} Abbreviated instance
         */
        Abbreviated.create = function create(properties) {
            return new Abbreviated(properties);
        };

        /**
         * Encodes the specified Abbreviated message. Does not implicitly {@link QueryResponse.Abbreviated.verify|verify} messages.
         * @function encode
         * @memberof QueryResponse.Abbreviated
         * @static
         * @param {QueryResponse.IAbbreviated} message Abbreviated message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Abbreviated.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.parents != null && message.parents.length)
                for (let i = 0; i < message.parents.length; ++i)
                    writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.parents[i]);
            if (message.hash != null && message.hasOwnProperty("hash"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.hash);
            return writer;
        };

        /**
         * Encodes the specified Abbreviated message, length delimited. Does not implicitly {@link QueryResponse.Abbreviated.verify|verify} messages.
         * @function encodeDelimited
         * @memberof QueryResponse.Abbreviated
         * @static
         * @param {QueryResponse.IAbbreviated} message Abbreviated message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Abbreviated.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Abbreviated message from the specified reader or buffer.
         * @function decode
         * @memberof QueryResponse.Abbreviated
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {QueryResponse.Abbreviated} Abbreviated
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Abbreviated.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.QueryResponse.Abbreviated();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.parents && message.parents.length))
                        message.parents = [];
                    message.parents.push(reader.bytes());
                    break;
                case 2:
                    message.hash = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Abbreviated message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof QueryResponse.Abbreviated
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {QueryResponse.Abbreviated} Abbreviated
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Abbreviated.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Abbreviated message.
         * @function verify
         * @memberof QueryResponse.Abbreviated
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Abbreviated.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.parents != null && message.hasOwnProperty("parents")) {
                if (!Array.isArray(message.parents))
                    return "parents: array expected";
                for (let i = 0; i < message.parents.length; ++i)
                    if (!(message.parents[i] && typeof message.parents[i].length === "number" || $util.isString(message.parents[i])))
                        return "parents: buffer[] expected";
            }
            if (message.hash != null && message.hasOwnProperty("hash"))
                if (!(message.hash && typeof message.hash.length === "number" || $util.isString(message.hash)))
                    return "hash: buffer expected";
            return null;
        };

        /**
         * Creates an Abbreviated message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof QueryResponse.Abbreviated
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {QueryResponse.Abbreviated} Abbreviated
         */
        Abbreviated.fromObject = function fromObject(object) {
            if (object instanceof $root.QueryResponse.Abbreviated)
                return object;
            let message = new $root.QueryResponse.Abbreviated();
            if (object.parents) {
                if (!Array.isArray(object.parents))
                    throw TypeError(".QueryResponse.Abbreviated.parents: array expected");
                message.parents = [];
                for (let i = 0; i < object.parents.length; ++i)
                    if (typeof object.parents[i] === "string")
                        $util.base64.decode(object.parents[i], message.parents[i] = $util.newBuffer($util.base64.length(object.parents[i])), 0);
                    else if (object.parents[i].length)
                        message.parents[i] = object.parents[i];
            }
            if (object.hash != null)
                if (typeof object.hash === "string")
                    $util.base64.decode(object.hash, message.hash = $util.newBuffer($util.base64.length(object.hash)), 0);
                else if (object.hash.length)
                    message.hash = object.hash;
            return message;
        };

        /**
         * Creates a plain object from an Abbreviated message. Also converts values to other types if specified.
         * @function toObject
         * @memberof QueryResponse.Abbreviated
         * @static
         * @param {QueryResponse.Abbreviated} message Abbreviated
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Abbreviated.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.parents = [];
            if (options.defaults)
                if (options.bytes === String)
                    object.hash = "";
                else {
                    object.hash = [];
                    if (options.bytes !== Array)
                        object.hash = $util.newBuffer(object.hash);
                }
            if (message.parents && message.parents.length) {
                object.parents = [];
                for (let j = 0; j < message.parents.length; ++j)
                    object.parents[j] = options.bytes === String ? $util.base64.encode(message.parents[j], 0, message.parents[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.parents[j]) : message.parents[j];
            }
            if (message.hash != null && message.hasOwnProperty("hash"))
                object.hash = options.bytes === String ? $util.base64.encode(message.hash, 0, message.hash.length) : options.bytes === Array ? Array.prototype.slice.call(message.hash) : message.hash;
            return object;
        };

        /**
         * Converts this Abbreviated to JSON.
         * @function toJSON
         * @memberof QueryResponse.Abbreviated
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Abbreviated.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Abbreviated;
    })();

    return QueryResponse;
})();

export const Bulk = $root.Bulk = (() => {

    /**
     * Properties of a Bulk.
     * @exports IBulk
     * @interface IBulk
     * @property {Array.<Uint8Array>|null} [hashes] Bulk hashes
     */

    /**
     * Constructs a new Bulk.
     * @exports Bulk
     * @classdesc Represents a Bulk.
     * @implements IBulk
     * @constructor
     * @param {IBulk=} [properties] Properties to set
     */
    function Bulk(properties) {
        this.hashes = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Bulk hashes.
     * @member {Array.<Uint8Array>} hashes
     * @memberof Bulk
     * @instance
     */
    Bulk.prototype.hashes = $util.emptyArray;

    /**
     * Creates a new Bulk instance using the specified properties.
     * @function create
     * @memberof Bulk
     * @static
     * @param {IBulk=} [properties] Properties to set
     * @returns {Bulk} Bulk instance
     */
    Bulk.create = function create(properties) {
        return new Bulk(properties);
    };

    /**
     * Encodes the specified Bulk message. Does not implicitly {@link Bulk.verify|verify} messages.
     * @function encode
     * @memberof Bulk
     * @static
     * @param {IBulk} message Bulk message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Bulk.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.hashes != null && message.hashes.length)
            for (let i = 0; i < message.hashes.length; ++i)
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.hashes[i]);
        return writer;
    };

    /**
     * Encodes the specified Bulk message, length delimited. Does not implicitly {@link Bulk.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Bulk
     * @static
     * @param {IBulk} message Bulk message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Bulk.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Bulk message from the specified reader or buffer.
     * @function decode
     * @memberof Bulk
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Bulk} Bulk
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Bulk.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Bulk();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.hashes && message.hashes.length))
                    message.hashes = [];
                message.hashes.push(reader.bytes());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Bulk message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Bulk
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Bulk} Bulk
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Bulk.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Bulk message.
     * @function verify
     * @memberof Bulk
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Bulk.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.hashes != null && message.hasOwnProperty("hashes")) {
            if (!Array.isArray(message.hashes))
                return "hashes: array expected";
            for (let i = 0; i < message.hashes.length; ++i)
                if (!(message.hashes[i] && typeof message.hashes[i].length === "number" || $util.isString(message.hashes[i])))
                    return "hashes: buffer[] expected";
        }
        return null;
    };

    /**
     * Creates a Bulk message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Bulk
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Bulk} Bulk
     */
    Bulk.fromObject = function fromObject(object) {
        if (object instanceof $root.Bulk)
            return object;
        let message = new $root.Bulk();
        if (object.hashes) {
            if (!Array.isArray(object.hashes))
                throw TypeError(".Bulk.hashes: array expected");
            message.hashes = [];
            for (let i = 0; i < object.hashes.length; ++i)
                if (typeof object.hashes[i] === "string")
                    $util.base64.decode(object.hashes[i], message.hashes[i] = $util.newBuffer($util.base64.length(object.hashes[i])), 0);
                else if (object.hashes[i].length)
                    message.hashes[i] = object.hashes[i];
        }
        return message;
    };

    /**
     * Creates a plain object from a Bulk message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Bulk
     * @static
     * @param {Bulk} message Bulk
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Bulk.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults)
            object.hashes = [];
        if (message.hashes && message.hashes.length) {
            object.hashes = [];
            for (let j = 0; j < message.hashes.length; ++j)
                object.hashes[j] = options.bytes === String ? $util.base64.encode(message.hashes[j], 0, message.hashes[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.hashes[j]) : message.hashes[j];
        }
        return object;
    };

    /**
     * Converts this Bulk to JSON.
     * @function toJSON
     * @memberof Bulk
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Bulk.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Bulk;
})();

export const BulkResponse = $root.BulkResponse = (() => {

    /**
     * Properties of a BulkResponse.
     * @exports IBulkResponse
     * @interface IBulkResponse
     * @property {Array.<IChannelMessage>|null} [messages] BulkResponse messages
     * @property {number|null} [forwardIndex] BulkResponse forwardIndex
     */

    /**
     * Constructs a new BulkResponse.
     * @exports BulkResponse
     * @classdesc Represents a BulkResponse.
     * @implements IBulkResponse
     * @constructor
     * @param {IBulkResponse=} [properties] Properties to set
     */
    function BulkResponse(properties) {
        this.messages = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * BulkResponse messages.
     * @member {Array.<IChannelMessage>} messages
     * @memberof BulkResponse
     * @instance
     */
    BulkResponse.prototype.messages = $util.emptyArray;

    /**
     * BulkResponse forwardIndex.
     * @member {number} forwardIndex
     * @memberof BulkResponse
     * @instance
     */
    BulkResponse.prototype.forwardIndex = 0;

    /**
     * Creates a new BulkResponse instance using the specified properties.
     * @function create
     * @memberof BulkResponse
     * @static
     * @param {IBulkResponse=} [properties] Properties to set
     * @returns {BulkResponse} BulkResponse instance
     */
    BulkResponse.create = function create(properties) {
        return new BulkResponse(properties);
    };

    /**
     * Encodes the specified BulkResponse message. Does not implicitly {@link BulkResponse.verify|verify} messages.
     * @function encode
     * @memberof BulkResponse
     * @static
     * @param {IBulkResponse} message BulkResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    BulkResponse.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.messages != null && message.messages.length)
            for (let i = 0; i < message.messages.length; ++i)
                $root.ChannelMessage.encode(message.messages[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.forwardIndex != null && message.hasOwnProperty("forwardIndex"))
            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.forwardIndex);
        return writer;
    };

    /**
     * Encodes the specified BulkResponse message, length delimited. Does not implicitly {@link BulkResponse.verify|verify} messages.
     * @function encodeDelimited
     * @memberof BulkResponse
     * @static
     * @param {IBulkResponse} message BulkResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    BulkResponse.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a BulkResponse message from the specified reader or buffer.
     * @function decode
     * @memberof BulkResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {BulkResponse} BulkResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    BulkResponse.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BulkResponse();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.messages && message.messages.length))
                    message.messages = [];
                message.messages.push($root.ChannelMessage.decode(reader, reader.uint32()));
                break;
            case 2:
                message.forwardIndex = reader.uint32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a BulkResponse message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof BulkResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {BulkResponse} BulkResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    BulkResponse.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a BulkResponse message.
     * @function verify
     * @memberof BulkResponse
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    BulkResponse.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.messages != null && message.hasOwnProperty("messages")) {
            if (!Array.isArray(message.messages))
                return "messages: array expected";
            for (let i = 0; i < message.messages.length; ++i) {
                let error = $root.ChannelMessage.verify(message.messages[i]);
                if (error)
                    return "messages." + error;
            }
        }
        if (message.forwardIndex != null && message.hasOwnProperty("forwardIndex"))
            if (!$util.isInteger(message.forwardIndex))
                return "forwardIndex: integer expected";
        return null;
    };

    /**
     * Creates a BulkResponse message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof BulkResponse
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {BulkResponse} BulkResponse
     */
    BulkResponse.fromObject = function fromObject(object) {
        if (object instanceof $root.BulkResponse)
            return object;
        let message = new $root.BulkResponse();
        if (object.messages) {
            if (!Array.isArray(object.messages))
                throw TypeError(".BulkResponse.messages: array expected");
            message.messages = [];
            for (let i = 0; i < object.messages.length; ++i) {
                if (typeof object.messages[i] !== "object")
                    throw TypeError(".BulkResponse.messages: object expected");
                message.messages[i] = $root.ChannelMessage.fromObject(object.messages[i]);
            }
        }
        if (object.forwardIndex != null)
            message.forwardIndex = object.forwardIndex >>> 0;
        return message;
    };

    /**
     * Creates a plain object from a BulkResponse message. Also converts values to other types if specified.
     * @function toObject
     * @memberof BulkResponse
     * @static
     * @param {BulkResponse} message BulkResponse
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    BulkResponse.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults)
            object.messages = [];
        if (options.defaults)
            object.forwardIndex = 0;
        if (message.messages && message.messages.length) {
            object.messages = [];
            for (let j = 0; j < message.messages.length; ++j)
                object.messages[j] = $root.ChannelMessage.toObject(message.messages[j], options);
        }
        if (message.forwardIndex != null && message.hasOwnProperty("forwardIndex"))
            object.forwardIndex = message.forwardIndex;
        return object;
    };

    /**
     * Converts this BulkResponse to JSON.
     * @function toJSON
     * @memberof BulkResponse
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    BulkResponse.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return BulkResponse;
})();

export const SyncRequest = $root.SyncRequest = (() => {

    /**
     * Properties of a SyncRequest.
     * @exports ISyncRequest
     * @interface ISyncRequest
     * @property {SyncRequest.ITBS|null} [tbs] SyncRequest tbs
     * @property {Uint8Array|null} [signature] SyncRequest signature
     */

    /**
     * Constructs a new SyncRequest.
     * @exports SyncRequest
     * @classdesc Represents a SyncRequest.
     * @implements ISyncRequest
     * @constructor
     * @param {ISyncRequest=} [properties] Properties to set
     */
    function SyncRequest(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * SyncRequest tbs.
     * @member {SyncRequest.ITBS|null|undefined} tbs
     * @memberof SyncRequest
     * @instance
     */
    SyncRequest.prototype.tbs = null;

    /**
     * SyncRequest signature.
     * @member {Uint8Array} signature
     * @memberof SyncRequest
     * @instance
     */
    SyncRequest.prototype.signature = $util.newBuffer([]);

    /**
     * Creates a new SyncRequest instance using the specified properties.
     * @function create
     * @memberof SyncRequest
     * @static
     * @param {ISyncRequest=} [properties] Properties to set
     * @returns {SyncRequest} SyncRequest instance
     */
    SyncRequest.create = function create(properties) {
        return new SyncRequest(properties);
    };

    /**
     * Encodes the specified SyncRequest message. Does not implicitly {@link SyncRequest.verify|verify} messages.
     * @function encode
     * @memberof SyncRequest
     * @static
     * @param {ISyncRequest} message SyncRequest message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SyncRequest.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.tbs != null && message.hasOwnProperty("tbs"))
            $root.SyncRequest.TBS.encode(message.tbs, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.signature != null && message.hasOwnProperty("signature"))
            writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.signature);
        return writer;
    };

    /**
     * Encodes the specified SyncRequest message, length delimited. Does not implicitly {@link SyncRequest.verify|verify} messages.
     * @function encodeDelimited
     * @memberof SyncRequest
     * @static
     * @param {ISyncRequest} message SyncRequest message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SyncRequest.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a SyncRequest message from the specified reader or buffer.
     * @function decode
     * @memberof SyncRequest
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {SyncRequest} SyncRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SyncRequest.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.SyncRequest();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.tbs = $root.SyncRequest.TBS.decode(reader, reader.uint32());
                break;
            case 2:
                message.signature = reader.bytes();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a SyncRequest message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof SyncRequest
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {SyncRequest} SyncRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SyncRequest.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a SyncRequest message.
     * @function verify
     * @memberof SyncRequest
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    SyncRequest.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.tbs != null && message.hasOwnProperty("tbs")) {
            let error = $root.SyncRequest.TBS.verify(message.tbs);
            if (error)
                return "tbs." + error;
        }
        if (message.signature != null && message.hasOwnProperty("signature"))
            if (!(message.signature && typeof message.signature.length === "number" || $util.isString(message.signature)))
                return "signature: buffer expected";
        return null;
    };

    /**
     * Creates a SyncRequest message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof SyncRequest
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {SyncRequest} SyncRequest
     */
    SyncRequest.fromObject = function fromObject(object) {
        if (object instanceof $root.SyncRequest)
            return object;
        let message = new $root.SyncRequest();
        if (object.tbs != null) {
            if (typeof object.tbs !== "object")
                throw TypeError(".SyncRequest.tbs: object expected");
            message.tbs = $root.SyncRequest.TBS.fromObject(object.tbs);
        }
        if (object.signature != null)
            if (typeof object.signature === "string")
                $util.base64.decode(object.signature, message.signature = $util.newBuffer($util.base64.length(object.signature)), 0);
            else if (object.signature.length)
                message.signature = object.signature;
        return message;
    };

    /**
     * Creates a plain object from a SyncRequest message. Also converts values to other types if specified.
     * @function toObject
     * @memberof SyncRequest
     * @static
     * @param {SyncRequest} message SyncRequest
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    SyncRequest.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.tbs = null;
            if (options.bytes === String)
                object.signature = "";
            else {
                object.signature = [];
                if (options.bytes !== Array)
                    object.signature = $util.newBuffer(object.signature);
            }
        }
        if (message.tbs != null && message.hasOwnProperty("tbs"))
            object.tbs = $root.SyncRequest.TBS.toObject(message.tbs, options);
        if (message.signature != null && message.hasOwnProperty("signature"))
            object.signature = options.bytes === String ? $util.base64.encode(message.signature, 0, message.signature.length) : options.bytes === Array ? Array.prototype.slice.call(message.signature) : message.signature;
        return object;
    };

    /**
     * Converts this SyncRequest to JSON.
     * @function toJSON
     * @memberof SyncRequest
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    SyncRequest.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    SyncRequest.Content = (function() {

        /**
         * Properties of a Content.
         * @memberof SyncRequest
         * @interface IContent
         * @property {IQuery|null} [query] Content query
         * @property {IBulk|null} [bulk] Content bulk
         */

        /**
         * Constructs a new Content.
         * @memberof SyncRequest
         * @classdesc Represents a Content.
         * @implements IContent
         * @constructor
         * @param {SyncRequest.IContent=} [properties] Properties to set
         */
        function Content(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Content query.
         * @member {IQuery|null|undefined} query
         * @memberof SyncRequest.Content
         * @instance
         */
        Content.prototype.query = null;

        /**
         * Content bulk.
         * @member {IBulk|null|undefined} bulk
         * @memberof SyncRequest.Content
         * @instance
         */
        Content.prototype.bulk = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * Content content.
         * @member {"query"|"bulk"|undefined} content
         * @memberof SyncRequest.Content
         * @instance
         */
        Object.defineProperty(Content.prototype, "content", {
            get: $util.oneOfGetter($oneOfFields = ["query", "bulk"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new Content instance using the specified properties.
         * @function create
         * @memberof SyncRequest.Content
         * @static
         * @param {SyncRequest.IContent=} [properties] Properties to set
         * @returns {SyncRequest.Content} Content instance
         */
        Content.create = function create(properties) {
            return new Content(properties);
        };

        /**
         * Encodes the specified Content message. Does not implicitly {@link SyncRequest.Content.verify|verify} messages.
         * @function encode
         * @memberof SyncRequest.Content
         * @static
         * @param {SyncRequest.IContent} message Content message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Content.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.query != null && message.hasOwnProperty("query"))
                $root.Query.encode(message.query, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.bulk != null && message.hasOwnProperty("bulk"))
                $root.Bulk.encode(message.bulk, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Content message, length delimited. Does not implicitly {@link SyncRequest.Content.verify|verify} messages.
         * @function encodeDelimited
         * @memberof SyncRequest.Content
         * @static
         * @param {SyncRequest.IContent} message Content message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Content.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Content message from the specified reader or buffer.
         * @function decode
         * @memberof SyncRequest.Content
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SyncRequest.Content} Content
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Content.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.SyncRequest.Content();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.query = $root.Query.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.bulk = $root.Bulk.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Content message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof SyncRequest.Content
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {SyncRequest.Content} Content
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Content.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Content message.
         * @function verify
         * @memberof SyncRequest.Content
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Content.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            let properties = {};
            if (message.query != null && message.hasOwnProperty("query")) {
                properties.content = 1;
                {
                    let error = $root.Query.verify(message.query);
                    if (error)
                        return "query." + error;
                }
            }
            if (message.bulk != null && message.hasOwnProperty("bulk")) {
                if (properties.content === 1)
                    return "content: multiple values";
                properties.content = 1;
                {
                    let error = $root.Bulk.verify(message.bulk);
                    if (error)
                        return "bulk." + error;
                }
            }
            return null;
        };

        /**
         * Creates a Content message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof SyncRequest.Content
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {SyncRequest.Content} Content
         */
        Content.fromObject = function fromObject(object) {
            if (object instanceof $root.SyncRequest.Content)
                return object;
            let message = new $root.SyncRequest.Content();
            if (object.query != null) {
                if (typeof object.query !== "object")
                    throw TypeError(".SyncRequest.Content.query: object expected");
                message.query = $root.Query.fromObject(object.query);
            }
            if (object.bulk != null) {
                if (typeof object.bulk !== "object")
                    throw TypeError(".SyncRequest.Content.bulk: object expected");
                message.bulk = $root.Bulk.fromObject(object.bulk);
            }
            return message;
        };

        /**
         * Creates a plain object from a Content message. Also converts values to other types if specified.
         * @function toObject
         * @memberof SyncRequest.Content
         * @static
         * @param {SyncRequest.Content} message Content
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Content.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (message.query != null && message.hasOwnProperty("query")) {
                object.query = $root.Query.toObject(message.query, options);
                if (options.oneofs)
                    object.content = "query";
            }
            if (message.bulk != null && message.hasOwnProperty("bulk")) {
                object.bulk = $root.Bulk.toObject(message.bulk, options);
                if (options.oneofs)
                    object.content = "bulk";
            }
            return object;
        };

        /**
         * Converts this Content to JSON.
         * @function toJSON
         * @memberof SyncRequest.Content
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Content.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Content;
    })();

    SyncRequest.TBS = (function() {

        /**
         * Properties of a TBS.
         * @memberof SyncRequest
         * @interface ITBS
         * @property {Uint8Array|null} [channelId] TBS channelId
         * @property {number|null} [seq] TBS seq
         * @property {Array.<ILink>|null} [chain] TBS chain
         * @property {Uint8Array|null} [nonce] TBS nonce
         * @property {Uint8Array|null} [box] TBS box
         * @property {Uint8Array|null} [responsePubKey] TBS responsePubKey
         */

        /**
         * Constructs a new TBS.
         * @memberof SyncRequest
         * @classdesc Represents a TBS.
         * @implements ITBS
         * @constructor
         * @param {SyncRequest.ITBS=} [properties] Properties to set
         */
        function TBS(properties) {
            this.chain = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TBS channelId.
         * @member {Uint8Array} channelId
         * @memberof SyncRequest.TBS
         * @instance
         */
        TBS.prototype.channelId = $util.newBuffer([]);

        /**
         * TBS seq.
         * @member {number} seq
         * @memberof SyncRequest.TBS
         * @instance
         */
        TBS.prototype.seq = 0;

        /**
         * TBS chain.
         * @member {Array.<ILink>} chain
         * @memberof SyncRequest.TBS
         * @instance
         */
        TBS.prototype.chain = $util.emptyArray;

        /**
         * TBS nonce.
         * @member {Uint8Array} nonce
         * @memberof SyncRequest.TBS
         * @instance
         */
        TBS.prototype.nonce = $util.newBuffer([]);

        /**
         * TBS box.
         * @member {Uint8Array} box
         * @memberof SyncRequest.TBS
         * @instance
         */
        TBS.prototype.box = $util.newBuffer([]);

        /**
         * TBS responsePubKey.
         * @member {Uint8Array} responsePubKey
         * @memberof SyncRequest.TBS
         * @instance
         */
        TBS.prototype.responsePubKey = $util.newBuffer([]);

        /**
         * Creates a new TBS instance using the specified properties.
         * @function create
         * @memberof SyncRequest.TBS
         * @static
         * @param {SyncRequest.ITBS=} [properties] Properties to set
         * @returns {SyncRequest.TBS} TBS instance
         */
        TBS.create = function create(properties) {
            return new TBS(properties);
        };

        /**
         * Encodes the specified TBS message. Does not implicitly {@link SyncRequest.TBS.verify|verify} messages.
         * @function encode
         * @memberof SyncRequest.TBS
         * @static
         * @param {SyncRequest.ITBS} message TBS message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TBS.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.channelId != null && message.hasOwnProperty("channelId"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.channelId);
            if (message.seq != null && message.hasOwnProperty("seq"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.seq);
            if (message.chain != null && message.chain.length)
                for (let i = 0; i < message.chain.length; ++i)
                    $root.Link.encode(message.chain[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.nonce != null && message.hasOwnProperty("nonce"))
                writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.nonce);
            if (message.box != null && message.hasOwnProperty("box"))
                writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.box);
            if (message.responsePubKey != null && message.hasOwnProperty("responsePubKey"))
                writer.uint32(/* id 6, wireType 2 =*/50).bytes(message.responsePubKey);
            return writer;
        };

        /**
         * Encodes the specified TBS message, length delimited. Does not implicitly {@link SyncRequest.TBS.verify|verify} messages.
         * @function encodeDelimited
         * @memberof SyncRequest.TBS
         * @static
         * @param {SyncRequest.ITBS} message TBS message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TBS.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TBS message from the specified reader or buffer.
         * @function decode
         * @memberof SyncRequest.TBS
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SyncRequest.TBS} TBS
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TBS.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.SyncRequest.TBS();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.channelId = reader.bytes();
                    break;
                case 2:
                    message.seq = reader.uint32();
                    break;
                case 3:
                    if (!(message.chain && message.chain.length))
                        message.chain = [];
                    message.chain.push($root.Link.decode(reader, reader.uint32()));
                    break;
                case 4:
                    message.nonce = reader.bytes();
                    break;
                case 5:
                    message.box = reader.bytes();
                    break;
                case 6:
                    message.responsePubKey = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a TBS message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof SyncRequest.TBS
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {SyncRequest.TBS} TBS
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TBS.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TBS message.
         * @function verify
         * @memberof SyncRequest.TBS
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TBS.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.channelId != null && message.hasOwnProperty("channelId"))
                if (!(message.channelId && typeof message.channelId.length === "number" || $util.isString(message.channelId)))
                    return "channelId: buffer expected";
            if (message.seq != null && message.hasOwnProperty("seq"))
                if (!$util.isInteger(message.seq))
                    return "seq: integer expected";
            if (message.chain != null && message.hasOwnProperty("chain")) {
                if (!Array.isArray(message.chain))
                    return "chain: array expected";
                for (let i = 0; i < message.chain.length; ++i) {
                    let error = $root.Link.verify(message.chain[i]);
                    if (error)
                        return "chain." + error;
                }
            }
            if (message.nonce != null && message.hasOwnProperty("nonce"))
                if (!(message.nonce && typeof message.nonce.length === "number" || $util.isString(message.nonce)))
                    return "nonce: buffer expected";
            if (message.box != null && message.hasOwnProperty("box"))
                if (!(message.box && typeof message.box.length === "number" || $util.isString(message.box)))
                    return "box: buffer expected";
            if (message.responsePubKey != null && message.hasOwnProperty("responsePubKey"))
                if (!(message.responsePubKey && typeof message.responsePubKey.length === "number" || $util.isString(message.responsePubKey)))
                    return "responsePubKey: buffer expected";
            return null;
        };

        /**
         * Creates a TBS message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof SyncRequest.TBS
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {SyncRequest.TBS} TBS
         */
        TBS.fromObject = function fromObject(object) {
            if (object instanceof $root.SyncRequest.TBS)
                return object;
            let message = new $root.SyncRequest.TBS();
            if (object.channelId != null)
                if (typeof object.channelId === "string")
                    $util.base64.decode(object.channelId, message.channelId = $util.newBuffer($util.base64.length(object.channelId)), 0);
                else if (object.channelId.length)
                    message.channelId = object.channelId;
            if (object.seq != null)
                message.seq = object.seq >>> 0;
            if (object.chain) {
                if (!Array.isArray(object.chain))
                    throw TypeError(".SyncRequest.TBS.chain: array expected");
                message.chain = [];
                for (let i = 0; i < object.chain.length; ++i) {
                    if (typeof object.chain[i] !== "object")
                        throw TypeError(".SyncRequest.TBS.chain: object expected");
                    message.chain[i] = $root.Link.fromObject(object.chain[i]);
                }
            }
            if (object.nonce != null)
                if (typeof object.nonce === "string")
                    $util.base64.decode(object.nonce, message.nonce = $util.newBuffer($util.base64.length(object.nonce)), 0);
                else if (object.nonce.length)
                    message.nonce = object.nonce;
            if (object.box != null)
                if (typeof object.box === "string")
                    $util.base64.decode(object.box, message.box = $util.newBuffer($util.base64.length(object.box)), 0);
                else if (object.box.length)
                    message.box = object.box;
            if (object.responsePubKey != null)
                if (typeof object.responsePubKey === "string")
                    $util.base64.decode(object.responsePubKey, message.responsePubKey = $util.newBuffer($util.base64.length(object.responsePubKey)), 0);
                else if (object.responsePubKey.length)
                    message.responsePubKey = object.responsePubKey;
            return message;
        };

        /**
         * Creates a plain object from a TBS message. Also converts values to other types if specified.
         * @function toObject
         * @memberof SyncRequest.TBS
         * @static
         * @param {SyncRequest.TBS} message TBS
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TBS.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.chain = [];
            if (options.defaults) {
                if (options.bytes === String)
                    object.channelId = "";
                else {
                    object.channelId = [];
                    if (options.bytes !== Array)
                        object.channelId = $util.newBuffer(object.channelId);
                }
                object.seq = 0;
                if (options.bytes === String)
                    object.nonce = "";
                else {
                    object.nonce = [];
                    if (options.bytes !== Array)
                        object.nonce = $util.newBuffer(object.nonce);
                }
                if (options.bytes === String)
                    object.box = "";
                else {
                    object.box = [];
                    if (options.bytes !== Array)
                        object.box = $util.newBuffer(object.box);
                }
                if (options.bytes === String)
                    object.responsePubKey = "";
                else {
                    object.responsePubKey = [];
                    if (options.bytes !== Array)
                        object.responsePubKey = $util.newBuffer(object.responsePubKey);
                }
            }
            if (message.channelId != null && message.hasOwnProperty("channelId"))
                object.channelId = options.bytes === String ? $util.base64.encode(message.channelId, 0, message.channelId.length) : options.bytes === Array ? Array.prototype.slice.call(message.channelId) : message.channelId;
            if (message.seq != null && message.hasOwnProperty("seq"))
                object.seq = message.seq;
            if (message.chain && message.chain.length) {
                object.chain = [];
                for (let j = 0; j < message.chain.length; ++j)
                    object.chain[j] = $root.Link.toObject(message.chain[j], options);
            }
            if (message.nonce != null && message.hasOwnProperty("nonce"))
                object.nonce = options.bytes === String ? $util.base64.encode(message.nonce, 0, message.nonce.length) : options.bytes === Array ? Array.prototype.slice.call(message.nonce) : message.nonce;
            if (message.box != null && message.hasOwnProperty("box"))
                object.box = options.bytes === String ? $util.base64.encode(message.box, 0, message.box.length) : options.bytes === Array ? Array.prototype.slice.call(message.box) : message.box;
            if (message.responsePubKey != null && message.hasOwnProperty("responsePubKey"))
                object.responsePubKey = options.bytes === String ? $util.base64.encode(message.responsePubKey, 0, message.responsePubKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.responsePubKey) : message.responsePubKey;
            return object;
        };

        /**
         * Converts this TBS to JSON.
         * @function toJSON
         * @memberof SyncRequest.TBS
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TBS.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return TBS;
    })();

    return SyncRequest;
})();

export const SyncResponse = $root.SyncResponse = (() => {

    /**
     * Properties of a SyncResponse.
     * @exports ISyncResponse
     * @interface ISyncResponse
     * @property {Uint8Array|null} [channelId] SyncResponse channelId
     * @property {number|null} [seq] SyncResponse seq
     * @property {Uint8Array|null} [box] SyncResponse box
     */

    /**
     * Constructs a new SyncResponse.
     * @exports SyncResponse
     * @classdesc Represents a SyncResponse.
     * @implements ISyncResponse
     * @constructor
     * @param {ISyncResponse=} [properties] Properties to set
     */
    function SyncResponse(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * SyncResponse channelId.
     * @member {Uint8Array} channelId
     * @memberof SyncResponse
     * @instance
     */
    SyncResponse.prototype.channelId = $util.newBuffer([]);

    /**
     * SyncResponse seq.
     * @member {number} seq
     * @memberof SyncResponse
     * @instance
     */
    SyncResponse.prototype.seq = 0;

    /**
     * SyncResponse box.
     * @member {Uint8Array} box
     * @memberof SyncResponse
     * @instance
     */
    SyncResponse.prototype.box = $util.newBuffer([]);

    /**
     * Creates a new SyncResponse instance using the specified properties.
     * @function create
     * @memberof SyncResponse
     * @static
     * @param {ISyncResponse=} [properties] Properties to set
     * @returns {SyncResponse} SyncResponse instance
     */
    SyncResponse.create = function create(properties) {
        return new SyncResponse(properties);
    };

    /**
     * Encodes the specified SyncResponse message. Does not implicitly {@link SyncResponse.verify|verify} messages.
     * @function encode
     * @memberof SyncResponse
     * @static
     * @param {ISyncResponse} message SyncResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SyncResponse.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.channelId != null && message.hasOwnProperty("channelId"))
            writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.channelId);
        if (message.seq != null && message.hasOwnProperty("seq"))
            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.seq);
        if (message.box != null && message.hasOwnProperty("box"))
            writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.box);
        return writer;
    };

    /**
     * Encodes the specified SyncResponse message, length delimited. Does not implicitly {@link SyncResponse.verify|verify} messages.
     * @function encodeDelimited
     * @memberof SyncResponse
     * @static
     * @param {ISyncResponse} message SyncResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SyncResponse.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a SyncResponse message from the specified reader or buffer.
     * @function decode
     * @memberof SyncResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {SyncResponse} SyncResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SyncResponse.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.SyncResponse();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.channelId = reader.bytes();
                break;
            case 2:
                message.seq = reader.uint32();
                break;
            case 3:
                message.box = reader.bytes();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a SyncResponse message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof SyncResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {SyncResponse} SyncResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SyncResponse.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a SyncResponse message.
     * @function verify
     * @memberof SyncResponse
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    SyncResponse.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.channelId != null && message.hasOwnProperty("channelId"))
            if (!(message.channelId && typeof message.channelId.length === "number" || $util.isString(message.channelId)))
                return "channelId: buffer expected";
        if (message.seq != null && message.hasOwnProperty("seq"))
            if (!$util.isInteger(message.seq))
                return "seq: integer expected";
        if (message.box != null && message.hasOwnProperty("box"))
            if (!(message.box && typeof message.box.length === "number" || $util.isString(message.box)))
                return "box: buffer expected";
        return null;
    };

    /**
     * Creates a SyncResponse message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof SyncResponse
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {SyncResponse} SyncResponse
     */
    SyncResponse.fromObject = function fromObject(object) {
        if (object instanceof $root.SyncResponse)
            return object;
        let message = new $root.SyncResponse();
        if (object.channelId != null)
            if (typeof object.channelId === "string")
                $util.base64.decode(object.channelId, message.channelId = $util.newBuffer($util.base64.length(object.channelId)), 0);
            else if (object.channelId.length)
                message.channelId = object.channelId;
        if (object.seq != null)
            message.seq = object.seq >>> 0;
        if (object.box != null)
            if (typeof object.box === "string")
                $util.base64.decode(object.box, message.box = $util.newBuffer($util.base64.length(object.box)), 0);
            else if (object.box.length)
                message.box = object.box;
        return message;
    };

    /**
     * Creates a plain object from a SyncResponse message. Also converts values to other types if specified.
     * @function toObject
     * @memberof SyncResponse
     * @static
     * @param {SyncResponse} message SyncResponse
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    SyncResponse.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            if (options.bytes === String)
                object.channelId = "";
            else {
                object.channelId = [];
                if (options.bytes !== Array)
                    object.channelId = $util.newBuffer(object.channelId);
            }
            object.seq = 0;
            if (options.bytes === String)
                object.box = "";
            else {
                object.box = [];
                if (options.bytes !== Array)
                    object.box = $util.newBuffer(object.box);
            }
        }
        if (message.channelId != null && message.hasOwnProperty("channelId"))
            object.channelId = options.bytes === String ? $util.base64.encode(message.channelId, 0, message.channelId.length) : options.bytes === Array ? Array.prototype.slice.call(message.channelId) : message.channelId;
        if (message.seq != null && message.hasOwnProperty("seq"))
            object.seq = message.seq;
        if (message.box != null && message.hasOwnProperty("box"))
            object.box = options.bytes === String ? $util.base64.encode(message.box, 0, message.box.length) : options.bytes === Array ? Array.prototype.slice.call(message.box) : message.box;
        return object;
    };

    /**
     * Converts this SyncResponse to JSON.
     * @function toJSON
     * @memberof SyncResponse
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    SyncResponse.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    SyncResponse.Content = (function() {

        /**
         * Properties of a Content.
         * @memberof SyncResponse
         * @interface IContent
         * @property {IQueryResponse|null} [queryResponse] Content queryResponse
         * @property {IBulkResponse|null} [bulkResponse] Content bulkResponse
         */

        /**
         * Constructs a new Content.
         * @memberof SyncResponse
         * @classdesc Represents a Content.
         * @implements IContent
         * @constructor
         * @param {SyncResponse.IContent=} [properties] Properties to set
         */
        function Content(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Content queryResponse.
         * @member {IQueryResponse|null|undefined} queryResponse
         * @memberof SyncResponse.Content
         * @instance
         */
        Content.prototype.queryResponse = null;

        /**
         * Content bulkResponse.
         * @member {IBulkResponse|null|undefined} bulkResponse
         * @memberof SyncResponse.Content
         * @instance
         */
        Content.prototype.bulkResponse = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * Content content.
         * @member {"queryResponse"|"bulkResponse"|undefined} content
         * @memberof SyncResponse.Content
         * @instance
         */
        Object.defineProperty(Content.prototype, "content", {
            get: $util.oneOfGetter($oneOfFields = ["queryResponse", "bulkResponse"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new Content instance using the specified properties.
         * @function create
         * @memberof SyncResponse.Content
         * @static
         * @param {SyncResponse.IContent=} [properties] Properties to set
         * @returns {SyncResponse.Content} Content instance
         */
        Content.create = function create(properties) {
            return new Content(properties);
        };

        /**
         * Encodes the specified Content message. Does not implicitly {@link SyncResponse.Content.verify|verify} messages.
         * @function encode
         * @memberof SyncResponse.Content
         * @static
         * @param {SyncResponse.IContent} message Content message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Content.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.queryResponse != null && message.hasOwnProperty("queryResponse"))
                $root.QueryResponse.encode(message.queryResponse, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.bulkResponse != null && message.hasOwnProperty("bulkResponse"))
                $root.BulkResponse.encode(message.bulkResponse, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Content message, length delimited. Does not implicitly {@link SyncResponse.Content.verify|verify} messages.
         * @function encodeDelimited
         * @memberof SyncResponse.Content
         * @static
         * @param {SyncResponse.IContent} message Content message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Content.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Content message from the specified reader or buffer.
         * @function decode
         * @memberof SyncResponse.Content
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SyncResponse.Content} Content
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Content.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.SyncResponse.Content();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.queryResponse = $root.QueryResponse.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.bulkResponse = $root.BulkResponse.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Content message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof SyncResponse.Content
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {SyncResponse.Content} Content
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Content.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Content message.
         * @function verify
         * @memberof SyncResponse.Content
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Content.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            let properties = {};
            if (message.queryResponse != null && message.hasOwnProperty("queryResponse")) {
                properties.content = 1;
                {
                    let error = $root.QueryResponse.verify(message.queryResponse);
                    if (error)
                        return "queryResponse." + error;
                }
            }
            if (message.bulkResponse != null && message.hasOwnProperty("bulkResponse")) {
                if (properties.content === 1)
                    return "content: multiple values";
                properties.content = 1;
                {
                    let error = $root.BulkResponse.verify(message.bulkResponse);
                    if (error)
                        return "bulkResponse." + error;
                }
            }
            return null;
        };

        /**
         * Creates a Content message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof SyncResponse.Content
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {SyncResponse.Content} Content
         */
        Content.fromObject = function fromObject(object) {
            if (object instanceof $root.SyncResponse.Content)
                return object;
            let message = new $root.SyncResponse.Content();
            if (object.queryResponse != null) {
                if (typeof object.queryResponse !== "object")
                    throw TypeError(".SyncResponse.Content.queryResponse: object expected");
                message.queryResponse = $root.QueryResponse.fromObject(object.queryResponse);
            }
            if (object.bulkResponse != null) {
                if (typeof object.bulkResponse !== "object")
                    throw TypeError(".SyncResponse.Content.bulkResponse: object expected");
                message.bulkResponse = $root.BulkResponse.fromObject(object.bulkResponse);
            }
            return message;
        };

        /**
         * Creates a plain object from a Content message. Also converts values to other types if specified.
         * @function toObject
         * @memberof SyncResponse.Content
         * @static
         * @param {SyncResponse.Content} message Content
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Content.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (message.queryResponse != null && message.hasOwnProperty("queryResponse")) {
                object.queryResponse = $root.QueryResponse.toObject(message.queryResponse, options);
                if (options.oneofs)
                    object.content = "queryResponse";
            }
            if (message.bulkResponse != null && message.hasOwnProperty("bulkResponse")) {
                object.bulkResponse = $root.BulkResponse.toObject(message.bulkResponse, options);
                if (options.oneofs)
                    object.content = "bulkResponse";
            }
            return object;
        };

        /**
         * Converts this Content to JSON.
         * @function toJSON
         * @memberof SyncResponse.Content
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Content.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Content;
    })();

    return SyncResponse;
})();

export const Error = $root.Error = (() => {

    /**
     * Properties of an Error.
     * @exports IError
     * @interface IError
     * @property {string|null} [reason] Error reason
     */

    /**
     * Constructs a new Error.
     * @exports Error
     * @classdesc Represents an Error.
     * @implements IError
     * @constructor
     * @param {IError=} [properties] Properties to set
     */
    function Error(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Error reason.
     * @member {string} reason
     * @memberof Error
     * @instance
     */
    Error.prototype.reason = "";

    /**
     * Creates a new Error instance using the specified properties.
     * @function create
     * @memberof Error
     * @static
     * @param {IError=} [properties] Properties to set
     * @returns {Error} Error instance
     */
    Error.create = function create(properties) {
        return new Error(properties);
    };

    /**
     * Encodes the specified Error message. Does not implicitly {@link Error.verify|verify} messages.
     * @function encode
     * @memberof Error
     * @static
     * @param {IError} message Error message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Error.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.reason != null && message.hasOwnProperty("reason"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.reason);
        return writer;
    };

    /**
     * Encodes the specified Error message, length delimited. Does not implicitly {@link Error.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Error
     * @static
     * @param {IError} message Error message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Error.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an Error message from the specified reader or buffer.
     * @function decode
     * @memberof Error
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Error} Error
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Error.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Error();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.reason = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an Error message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Error
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Error} Error
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Error.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an Error message.
     * @function verify
     * @memberof Error
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Error.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.reason != null && message.hasOwnProperty("reason"))
            if (!$util.isString(message.reason))
                return "reason: string expected";
        return null;
    };

    /**
     * Creates an Error message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Error
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Error} Error
     */
    Error.fromObject = function fromObject(object) {
        if (object instanceof $root.Error)
            return object;
        let message = new $root.Error();
        if (object.reason != null)
            message.reason = String(object.reason);
        return message;
    };

    /**
     * Creates a plain object from an Error message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Error
     * @static
     * @param {Error} message Error
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Error.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults)
            object.reason = "";
        if (message.reason != null && message.hasOwnProperty("reason"))
            object.reason = message.reason;
        return object;
    };

    /**
     * Converts this Error to JSON.
     * @function toJSON
     * @memberof Error
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Error.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Error;
})();

export const Notification = $root.Notification = (() => {

    /**
     * Properties of a Notification.
     * @exports INotification
     * @interface INotification
     * @property {Uint8Array|null} [channelId] Notification channelId
     */

    /**
     * Constructs a new Notification.
     * @exports Notification
     * @classdesc Represents a Notification.
     * @implements INotification
     * @constructor
     * @param {INotification=} [properties] Properties to set
     */
    function Notification(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Notification channelId.
     * @member {Uint8Array} channelId
     * @memberof Notification
     * @instance
     */
    Notification.prototype.channelId = $util.newBuffer([]);

    /**
     * Creates a new Notification instance using the specified properties.
     * @function create
     * @memberof Notification
     * @static
     * @param {INotification=} [properties] Properties to set
     * @returns {Notification} Notification instance
     */
    Notification.create = function create(properties) {
        return new Notification(properties);
    };

    /**
     * Encodes the specified Notification message. Does not implicitly {@link Notification.verify|verify} messages.
     * @function encode
     * @memberof Notification
     * @static
     * @param {INotification} message Notification message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Notification.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.channelId != null && message.hasOwnProperty("channelId"))
            writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.channelId);
        return writer;
    };

    /**
     * Encodes the specified Notification message, length delimited. Does not implicitly {@link Notification.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Notification
     * @static
     * @param {INotification} message Notification message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Notification.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Notification message from the specified reader or buffer.
     * @function decode
     * @memberof Notification
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Notification} Notification
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Notification.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Notification();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.channelId = reader.bytes();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Notification message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Notification
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Notification} Notification
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Notification.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Notification message.
     * @function verify
     * @memberof Notification
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Notification.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.channelId != null && message.hasOwnProperty("channelId"))
            if (!(message.channelId && typeof message.channelId.length === "number" || $util.isString(message.channelId)))
                return "channelId: buffer expected";
        return null;
    };

    /**
     * Creates a Notification message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Notification
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Notification} Notification
     */
    Notification.fromObject = function fromObject(object) {
        if (object instanceof $root.Notification)
            return object;
        let message = new $root.Notification();
        if (object.channelId != null)
            if (typeof object.channelId === "string")
                $util.base64.decode(object.channelId, message.channelId = $util.newBuffer($util.base64.length(object.channelId)), 0);
            else if (object.channelId.length)
                message.channelId = object.channelId;
        return message;
    };

    /**
     * Creates a plain object from a Notification message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Notification
     * @static
     * @param {Notification} message Notification
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Notification.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults)
            if (options.bytes === String)
                object.channelId = "";
            else {
                object.channelId = [];
                if (options.bytes !== Array)
                    object.channelId = $util.newBuffer(object.channelId);
            }
        if (message.channelId != null && message.hasOwnProperty("channelId"))
            object.channelId = options.bytes === String ? $util.base64.encode(message.channelId, 0, message.channelId.length) : options.bytes === Array ? Array.prototype.slice.call(message.channelId) : message.channelId;
        return object;
    };

    /**
     * Converts this Notification to JSON.
     * @function toJSON
     * @memberof Notification
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Notification.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Notification;
})();

export const Ping = $root.Ping = (() => {

    /**
     * Properties of a Ping.
     * @exports IPing
     * @interface IPing
     * @property {number|null} [seq] Ping seq
     */

    /**
     * Constructs a new Ping.
     * @exports Ping
     * @classdesc Represents a Ping.
     * @implements IPing
     * @constructor
     * @param {IPing=} [properties] Properties to set
     */
    function Ping(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Ping seq.
     * @member {number} seq
     * @memberof Ping
     * @instance
     */
    Ping.prototype.seq = 0;

    /**
     * Creates a new Ping instance using the specified properties.
     * @function create
     * @memberof Ping
     * @static
     * @param {IPing=} [properties] Properties to set
     * @returns {Ping} Ping instance
     */
    Ping.create = function create(properties) {
        return new Ping(properties);
    };

    /**
     * Encodes the specified Ping message. Does not implicitly {@link Ping.verify|verify} messages.
     * @function encode
     * @memberof Ping
     * @static
     * @param {IPing} message Ping message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Ping.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.seq != null && message.hasOwnProperty("seq"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.seq);
        return writer;
    };

    /**
     * Encodes the specified Ping message, length delimited. Does not implicitly {@link Ping.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Ping
     * @static
     * @param {IPing} message Ping message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Ping.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Ping message from the specified reader or buffer.
     * @function decode
     * @memberof Ping
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Ping} Ping
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Ping.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Ping();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.seq = reader.uint32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Ping message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Ping
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Ping} Ping
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Ping.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Ping message.
     * @function verify
     * @memberof Ping
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Ping.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.seq != null && message.hasOwnProperty("seq"))
            if (!$util.isInteger(message.seq))
                return "seq: integer expected";
        return null;
    };

    /**
     * Creates a Ping message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Ping
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Ping} Ping
     */
    Ping.fromObject = function fromObject(object) {
        if (object instanceof $root.Ping)
            return object;
        let message = new $root.Ping();
        if (object.seq != null)
            message.seq = object.seq >>> 0;
        return message;
    };

    /**
     * Creates a plain object from a Ping message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Ping
     * @static
     * @param {Ping} message Ping
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Ping.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults)
            object.seq = 0;
        if (message.seq != null && message.hasOwnProperty("seq"))
            object.seq = message.seq;
        return object;
    };

    /**
     * Converts this Ping to JSON.
     * @function toJSON
     * @memberof Ping
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Ping.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Ping;
})();

export const Pong = $root.Pong = (() => {

    /**
     * Properties of a Pong.
     * @exports IPong
     * @interface IPong
     * @property {number|null} [seq] Pong seq
     */

    /**
     * Constructs a new Pong.
     * @exports Pong
     * @classdesc Represents a Pong.
     * @implements IPong
     * @constructor
     * @param {IPong=} [properties] Properties to set
     */
    function Pong(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Pong seq.
     * @member {number} seq
     * @memberof Pong
     * @instance
     */
    Pong.prototype.seq = 0;

    /**
     * Creates a new Pong instance using the specified properties.
     * @function create
     * @memberof Pong
     * @static
     * @param {IPong=} [properties] Properties to set
     * @returns {Pong} Pong instance
     */
    Pong.create = function create(properties) {
        return new Pong(properties);
    };

    /**
     * Encodes the specified Pong message. Does not implicitly {@link Pong.verify|verify} messages.
     * @function encode
     * @memberof Pong
     * @static
     * @param {IPong} message Pong message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Pong.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.seq != null && message.hasOwnProperty("seq"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.seq);
        return writer;
    };

    /**
     * Encodes the specified Pong message, length delimited. Does not implicitly {@link Pong.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Pong
     * @static
     * @param {IPong} message Pong message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Pong.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Pong message from the specified reader or buffer.
     * @function decode
     * @memberof Pong
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Pong} Pong
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Pong.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Pong();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.seq = reader.uint32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Pong message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Pong
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Pong} Pong
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Pong.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Pong message.
     * @function verify
     * @memberof Pong
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Pong.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.seq != null && message.hasOwnProperty("seq"))
            if (!$util.isInteger(message.seq))
                return "seq: integer expected";
        return null;
    };

    /**
     * Creates a Pong message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Pong
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Pong} Pong
     */
    Pong.fromObject = function fromObject(object) {
        if (object instanceof $root.Pong)
            return object;
        let message = new $root.Pong();
        if (object.seq != null)
            message.seq = object.seq >>> 0;
        return message;
    };

    /**
     * Creates a plain object from a Pong message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Pong
     * @static
     * @param {Pong} message Pong
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Pong.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults)
            object.seq = 0;
        if (message.seq != null && message.hasOwnProperty("seq"))
            object.seq = message.seq;
        return object;
    };

    /**
     * Converts this Pong to JSON.
     * @function toJSON
     * @memberof Pong
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Pong.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Pong;
})();

export const Packet = $root.Packet = (() => {

    /**
     * Properties of a Packet.
     * @exports IPacket
     * @interface IPacket
     * @property {IError|null} [error] Packet error
     * @property {IEncryptedInvite|null} [invite] Packet invite
     * @property {ISyncRequest|null} [syncRequest] Packet syncRequest
     * @property {ISyncResponse|null} [syncResponse] Packet syncResponse
     * @property {INotification|null} [notification] Packet notification
     * @property {IPing|null} [ping] Packet ping
     * @property {IPong|null} [pong] Packet pong
     */

    /**
     * Constructs a new Packet.
     * @exports Packet
     * @classdesc Represents a Packet.
     * @implements IPacket
     * @constructor
     * @param {IPacket=} [properties] Properties to set
     */
    function Packet(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Packet error.
     * @member {IError|null|undefined} error
     * @memberof Packet
     * @instance
     */
    Packet.prototype.error = null;

    /**
     * Packet invite.
     * @member {IEncryptedInvite|null|undefined} invite
     * @memberof Packet
     * @instance
     */
    Packet.prototype.invite = null;

    /**
     * Packet syncRequest.
     * @member {ISyncRequest|null|undefined} syncRequest
     * @memberof Packet
     * @instance
     */
    Packet.prototype.syncRequest = null;

    /**
     * Packet syncResponse.
     * @member {ISyncResponse|null|undefined} syncResponse
     * @memberof Packet
     * @instance
     */
    Packet.prototype.syncResponse = null;

    /**
     * Packet notification.
     * @member {INotification|null|undefined} notification
     * @memberof Packet
     * @instance
     */
    Packet.prototype.notification = null;

    /**
     * Packet ping.
     * @member {IPing|null|undefined} ping
     * @memberof Packet
     * @instance
     */
    Packet.prototype.ping = null;

    /**
     * Packet pong.
     * @member {IPong|null|undefined} pong
     * @memberof Packet
     * @instance
     */
    Packet.prototype.pong = null;

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields;

    /**
     * Packet content.
     * @member {"error"|"invite"|"syncRequest"|"syncResponse"|"notification"|"ping"|"pong"|undefined} content
     * @memberof Packet
     * @instance
     */
    Object.defineProperty(Packet.prototype, "content", {
        get: $util.oneOfGetter($oneOfFields = ["error", "invite", "syncRequest", "syncResponse", "notification", "ping", "pong"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new Packet instance using the specified properties.
     * @function create
     * @memberof Packet
     * @static
     * @param {IPacket=} [properties] Properties to set
     * @returns {Packet} Packet instance
     */
    Packet.create = function create(properties) {
        return new Packet(properties);
    };

    /**
     * Encodes the specified Packet message. Does not implicitly {@link Packet.verify|verify} messages.
     * @function encode
     * @memberof Packet
     * @static
     * @param {IPacket} message Packet message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Packet.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.error != null && message.hasOwnProperty("error"))
            $root.Error.encode(message.error, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.invite != null && message.hasOwnProperty("invite"))
            $root.EncryptedInvite.encode(message.invite, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.syncRequest != null && message.hasOwnProperty("syncRequest"))
            $root.SyncRequest.encode(message.syncRequest, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        if (message.syncResponse != null && message.hasOwnProperty("syncResponse"))
            $root.SyncResponse.encode(message.syncResponse, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
        if (message.notification != null && message.hasOwnProperty("notification"))
            $root.Notification.encode(message.notification, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
        if (message.ping != null && message.hasOwnProperty("ping"))
            $root.Ping.encode(message.ping, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
        if (message.pong != null && message.hasOwnProperty("pong"))
            $root.Pong.encode(message.pong, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified Packet message, length delimited. Does not implicitly {@link Packet.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Packet
     * @static
     * @param {IPacket} message Packet message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Packet.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Packet message from the specified reader or buffer.
     * @function decode
     * @memberof Packet
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Packet} Packet
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Packet.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Packet();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.error = $root.Error.decode(reader, reader.uint32());
                break;
            case 2:
                message.invite = $root.EncryptedInvite.decode(reader, reader.uint32());
                break;
            case 3:
                message.syncRequest = $root.SyncRequest.decode(reader, reader.uint32());
                break;
            case 4:
                message.syncResponse = $root.SyncResponse.decode(reader, reader.uint32());
                break;
            case 5:
                message.notification = $root.Notification.decode(reader, reader.uint32());
                break;
            case 6:
                message.ping = $root.Ping.decode(reader, reader.uint32());
                break;
            case 7:
                message.pong = $root.Pong.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Packet message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Packet
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Packet} Packet
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Packet.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Packet message.
     * @function verify
     * @memberof Packet
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Packet.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        let properties = {};
        if (message.error != null && message.hasOwnProperty("error")) {
            properties.content = 1;
            {
                let error = $root.Error.verify(message.error);
                if (error)
                    return "error." + error;
            }
        }
        if (message.invite != null && message.hasOwnProperty("invite")) {
            if (properties.content === 1)
                return "content: multiple values";
            properties.content = 1;
            {
                let error = $root.EncryptedInvite.verify(message.invite);
                if (error)
                    return "invite." + error;
            }
        }
        if (message.syncRequest != null && message.hasOwnProperty("syncRequest")) {
            if (properties.content === 1)
                return "content: multiple values";
            properties.content = 1;
            {
                let error = $root.SyncRequest.verify(message.syncRequest);
                if (error)
                    return "syncRequest." + error;
            }
        }
        if (message.syncResponse != null && message.hasOwnProperty("syncResponse")) {
            if (properties.content === 1)
                return "content: multiple values";
            properties.content = 1;
            {
                let error = $root.SyncResponse.verify(message.syncResponse);
                if (error)
                    return "syncResponse." + error;
            }
        }
        if (message.notification != null && message.hasOwnProperty("notification")) {
            if (properties.content === 1)
                return "content: multiple values";
            properties.content = 1;
            {
                let error = $root.Notification.verify(message.notification);
                if (error)
                    return "notification." + error;
            }
        }
        if (message.ping != null && message.hasOwnProperty("ping")) {
            if (properties.content === 1)
                return "content: multiple values";
            properties.content = 1;
            {
                let error = $root.Ping.verify(message.ping);
                if (error)
                    return "ping." + error;
            }
        }
        if (message.pong != null && message.hasOwnProperty("pong")) {
            if (properties.content === 1)
                return "content: multiple values";
            properties.content = 1;
            {
                let error = $root.Pong.verify(message.pong);
                if (error)
                    return "pong." + error;
            }
        }
        return null;
    };

    /**
     * Creates a Packet message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Packet
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Packet} Packet
     */
    Packet.fromObject = function fromObject(object) {
        if (object instanceof $root.Packet)
            return object;
        let message = new $root.Packet();
        if (object.error != null) {
            if (typeof object.error !== "object")
                throw TypeError(".Packet.error: object expected");
            message.error = $root.Error.fromObject(object.error);
        }
        if (object.invite != null) {
            if (typeof object.invite !== "object")
                throw TypeError(".Packet.invite: object expected");
            message.invite = $root.EncryptedInvite.fromObject(object.invite);
        }
        if (object.syncRequest != null) {
            if (typeof object.syncRequest !== "object")
                throw TypeError(".Packet.syncRequest: object expected");
            message.syncRequest = $root.SyncRequest.fromObject(object.syncRequest);
        }
        if (object.syncResponse != null) {
            if (typeof object.syncResponse !== "object")
                throw TypeError(".Packet.syncResponse: object expected");
            message.syncResponse = $root.SyncResponse.fromObject(object.syncResponse);
        }
        if (object.notification != null) {
            if (typeof object.notification !== "object")
                throw TypeError(".Packet.notification: object expected");
            message.notification = $root.Notification.fromObject(object.notification);
        }
        if (object.ping != null) {
            if (typeof object.ping !== "object")
                throw TypeError(".Packet.ping: object expected");
            message.ping = $root.Ping.fromObject(object.ping);
        }
        if (object.pong != null) {
            if (typeof object.pong !== "object")
                throw TypeError(".Packet.pong: object expected");
            message.pong = $root.Pong.fromObject(object.pong);
        }
        return message;
    };

    /**
     * Creates a plain object from a Packet message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Packet
     * @static
     * @param {Packet} message Packet
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Packet.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (message.error != null && message.hasOwnProperty("error")) {
            object.error = $root.Error.toObject(message.error, options);
            if (options.oneofs)
                object.content = "error";
        }
        if (message.invite != null && message.hasOwnProperty("invite")) {
            object.invite = $root.EncryptedInvite.toObject(message.invite, options);
            if (options.oneofs)
                object.content = "invite";
        }
        if (message.syncRequest != null && message.hasOwnProperty("syncRequest")) {
            object.syncRequest = $root.SyncRequest.toObject(message.syncRequest, options);
            if (options.oneofs)
                object.content = "syncRequest";
        }
        if (message.syncResponse != null && message.hasOwnProperty("syncResponse")) {
            object.syncResponse = $root.SyncResponse.toObject(message.syncResponse, options);
            if (options.oneofs)
                object.content = "syncResponse";
        }
        if (message.notification != null && message.hasOwnProperty("notification")) {
            object.notification = $root.Notification.toObject(message.notification, options);
            if (options.oneofs)
                object.content = "notification";
        }
        if (message.ping != null && message.hasOwnProperty("ping")) {
            object.ping = $root.Ping.toObject(message.ping, options);
            if (options.oneofs)
                object.content = "ping";
        }
        if (message.pong != null && message.hasOwnProperty("pong")) {
            object.pong = $root.Pong.toObject(message.pong, options);
            if (options.oneofs)
                object.content = "pong";
        }
        return object;
    };

    /**
     * Converts this Packet to JSON.
     * @function toJSON
     * @memberof Packet
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Packet.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Packet;
})();

export const Identity = $root.Identity = (() => {

    /**
     * Properties of an Identity.
     * @exports IIdentity
     * @interface IIdentity
     * @property {string|null} [name] Identity name
     * @property {Uint8Array|null} [publicKey] Identity publicKey
     * @property {Uint8Array|null} [secretKey] Identity secretKey
     * @property {Array.<Identity.IChannelChain>|null} [channelChains] Identity channelChains
     * @property {string|null} [metadata] Identity metadata
     */

    /**
     * Constructs a new Identity.
     * @exports Identity
     * @classdesc Represents an Identity.
     * @implements IIdentity
     * @constructor
     * @param {IIdentity=} [properties] Properties to set
     */
    function Identity(properties) {
        this.channelChains = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Identity name.
     * @member {string} name
     * @memberof Identity
     * @instance
     */
    Identity.prototype.name = "";

    /**
     * Identity publicKey.
     * @member {Uint8Array} publicKey
     * @memberof Identity
     * @instance
     */
    Identity.prototype.publicKey = $util.newBuffer([]);

    /**
     * Identity secretKey.
     * @member {Uint8Array} secretKey
     * @memberof Identity
     * @instance
     */
    Identity.prototype.secretKey = $util.newBuffer([]);

    /**
     * Identity channelChains.
     * @member {Array.<Identity.IChannelChain>} channelChains
     * @memberof Identity
     * @instance
     */
    Identity.prototype.channelChains = $util.emptyArray;

    /**
     * Identity metadata.
     * @member {string} metadata
     * @memberof Identity
     * @instance
     */
    Identity.prototype.metadata = "";

    /**
     * Creates a new Identity instance using the specified properties.
     * @function create
     * @memberof Identity
     * @static
     * @param {IIdentity=} [properties] Properties to set
     * @returns {Identity} Identity instance
     */
    Identity.create = function create(properties) {
        return new Identity(properties);
    };

    /**
     * Encodes the specified Identity message. Does not implicitly {@link Identity.verify|verify} messages.
     * @function encode
     * @memberof Identity
     * @static
     * @param {IIdentity} message Identity message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Identity.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.name != null && message.hasOwnProperty("name"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
        if (message.publicKey != null && message.hasOwnProperty("publicKey"))
            writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.publicKey);
        if (message.secretKey != null && message.hasOwnProperty("secretKey"))
            writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.secretKey);
        if (message.channelChains != null && message.channelChains.length)
            for (let i = 0; i < message.channelChains.length; ++i)
                $root.Identity.ChannelChain.encode(message.channelChains[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
        if (message.metadata != null && message.hasOwnProperty("metadata"))
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.metadata);
        return writer;
    };

    /**
     * Encodes the specified Identity message, length delimited. Does not implicitly {@link Identity.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Identity
     * @static
     * @param {IIdentity} message Identity message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Identity.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an Identity message from the specified reader or buffer.
     * @function decode
     * @memberof Identity
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Identity} Identity
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Identity.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Identity();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.name = reader.string();
                break;
            case 2:
                message.publicKey = reader.bytes();
                break;
            case 3:
                message.secretKey = reader.bytes();
                break;
            case 4:
                if (!(message.channelChains && message.channelChains.length))
                    message.channelChains = [];
                message.channelChains.push($root.Identity.ChannelChain.decode(reader, reader.uint32()));
                break;
            case 5:
                message.metadata = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an Identity message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Identity
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Identity} Identity
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Identity.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an Identity message.
     * @function verify
     * @memberof Identity
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Identity.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.name != null && message.hasOwnProperty("name"))
            if (!$util.isString(message.name))
                return "name: string expected";
        if (message.publicKey != null && message.hasOwnProperty("publicKey"))
            if (!(message.publicKey && typeof message.publicKey.length === "number" || $util.isString(message.publicKey)))
                return "publicKey: buffer expected";
        if (message.secretKey != null && message.hasOwnProperty("secretKey"))
            if (!(message.secretKey && typeof message.secretKey.length === "number" || $util.isString(message.secretKey)))
                return "secretKey: buffer expected";
        if (message.channelChains != null && message.hasOwnProperty("channelChains")) {
            if (!Array.isArray(message.channelChains))
                return "channelChains: array expected";
            for (let i = 0; i < message.channelChains.length; ++i) {
                let error = $root.Identity.ChannelChain.verify(message.channelChains[i]);
                if (error)
                    return "channelChains." + error;
            }
        }
        if (message.metadata != null && message.hasOwnProperty("metadata"))
            if (!$util.isString(message.metadata))
                return "metadata: string expected";
        return null;
    };

    /**
     * Creates an Identity message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Identity
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Identity} Identity
     */
    Identity.fromObject = function fromObject(object) {
        if (object instanceof $root.Identity)
            return object;
        let message = new $root.Identity();
        if (object.name != null)
            message.name = String(object.name);
        if (object.publicKey != null)
            if (typeof object.publicKey === "string")
                $util.base64.decode(object.publicKey, message.publicKey = $util.newBuffer($util.base64.length(object.publicKey)), 0);
            else if (object.publicKey.length)
                message.publicKey = object.publicKey;
        if (object.secretKey != null)
            if (typeof object.secretKey === "string")
                $util.base64.decode(object.secretKey, message.secretKey = $util.newBuffer($util.base64.length(object.secretKey)), 0);
            else if (object.secretKey.length)
                message.secretKey = object.secretKey;
        if (object.channelChains) {
            if (!Array.isArray(object.channelChains))
                throw TypeError(".Identity.channelChains: array expected");
            message.channelChains = [];
            for (let i = 0; i < object.channelChains.length; ++i) {
                if (typeof object.channelChains[i] !== "object")
                    throw TypeError(".Identity.channelChains: object expected");
                message.channelChains[i] = $root.Identity.ChannelChain.fromObject(object.channelChains[i]);
            }
        }
        if (object.metadata != null)
            message.metadata = String(object.metadata);
        return message;
    };

    /**
     * Creates a plain object from an Identity message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Identity
     * @static
     * @param {Identity} message Identity
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Identity.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults)
            object.channelChains = [];
        if (options.defaults) {
            object.name = "";
            if (options.bytes === String)
                object.publicKey = "";
            else {
                object.publicKey = [];
                if (options.bytes !== Array)
                    object.publicKey = $util.newBuffer(object.publicKey);
            }
            if (options.bytes === String)
                object.secretKey = "";
            else {
                object.secretKey = [];
                if (options.bytes !== Array)
                    object.secretKey = $util.newBuffer(object.secretKey);
            }
            object.metadata = "";
        }
        if (message.name != null && message.hasOwnProperty("name"))
            object.name = message.name;
        if (message.publicKey != null && message.hasOwnProperty("publicKey"))
            object.publicKey = options.bytes === String ? $util.base64.encode(message.publicKey, 0, message.publicKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.publicKey) : message.publicKey;
        if (message.secretKey != null && message.hasOwnProperty("secretKey"))
            object.secretKey = options.bytes === String ? $util.base64.encode(message.secretKey, 0, message.secretKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.secretKey) : message.secretKey;
        if (message.channelChains && message.channelChains.length) {
            object.channelChains = [];
            for (let j = 0; j < message.channelChains.length; ++j)
                object.channelChains[j] = $root.Identity.ChannelChain.toObject(message.channelChains[j], options);
        }
        if (message.metadata != null && message.hasOwnProperty("metadata"))
            object.metadata = message.metadata;
        return object;
    };

    /**
     * Converts this Identity to JSON.
     * @function toJSON
     * @memberof Identity
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Identity.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    Identity.ChannelChain = (function() {

        /**
         * Properties of a ChannelChain.
         * @memberof Identity
         * @interface IChannelChain
         * @property {Uint8Array|null} [channelId] ChannelChain channelId
         * @property {Array.<ILink>|null} [links] ChannelChain links
         */

        /**
         * Constructs a new ChannelChain.
         * @memberof Identity
         * @classdesc Represents a ChannelChain.
         * @implements IChannelChain
         * @constructor
         * @param {Identity.IChannelChain=} [properties] Properties to set
         */
        function ChannelChain(properties) {
            this.links = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ChannelChain channelId.
         * @member {Uint8Array} channelId
         * @memberof Identity.ChannelChain
         * @instance
         */
        ChannelChain.prototype.channelId = $util.newBuffer([]);

        /**
         * ChannelChain links.
         * @member {Array.<ILink>} links
         * @memberof Identity.ChannelChain
         * @instance
         */
        ChannelChain.prototype.links = $util.emptyArray;

        /**
         * Creates a new ChannelChain instance using the specified properties.
         * @function create
         * @memberof Identity.ChannelChain
         * @static
         * @param {Identity.IChannelChain=} [properties] Properties to set
         * @returns {Identity.ChannelChain} ChannelChain instance
         */
        ChannelChain.create = function create(properties) {
            return new ChannelChain(properties);
        };

        /**
         * Encodes the specified ChannelChain message. Does not implicitly {@link Identity.ChannelChain.verify|verify} messages.
         * @function encode
         * @memberof Identity.ChannelChain
         * @static
         * @param {Identity.IChannelChain} message ChannelChain message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ChannelChain.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.channelId != null && message.hasOwnProperty("channelId"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.channelId);
            if (message.links != null && message.links.length)
                for (let i = 0; i < message.links.length; ++i)
                    $root.Link.encode(message.links[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ChannelChain message, length delimited. Does not implicitly {@link Identity.ChannelChain.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Identity.ChannelChain
         * @static
         * @param {Identity.IChannelChain} message ChannelChain message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ChannelChain.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ChannelChain message from the specified reader or buffer.
         * @function decode
         * @memberof Identity.ChannelChain
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Identity.ChannelChain} ChannelChain
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ChannelChain.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Identity.ChannelChain();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.channelId = reader.bytes();
                    break;
                case 2:
                    if (!(message.links && message.links.length))
                        message.links = [];
                    message.links.push($root.Link.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ChannelChain message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Identity.ChannelChain
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Identity.ChannelChain} ChannelChain
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ChannelChain.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ChannelChain message.
         * @function verify
         * @memberof Identity.ChannelChain
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ChannelChain.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.channelId != null && message.hasOwnProperty("channelId"))
                if (!(message.channelId && typeof message.channelId.length === "number" || $util.isString(message.channelId)))
                    return "channelId: buffer expected";
            if (message.links != null && message.hasOwnProperty("links")) {
                if (!Array.isArray(message.links))
                    return "links: array expected";
                for (let i = 0; i < message.links.length; ++i) {
                    let error = $root.Link.verify(message.links[i]);
                    if (error)
                        return "links." + error;
                }
            }
            return null;
        };

        /**
         * Creates a ChannelChain message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Identity.ChannelChain
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Identity.ChannelChain} ChannelChain
         */
        ChannelChain.fromObject = function fromObject(object) {
            if (object instanceof $root.Identity.ChannelChain)
                return object;
            let message = new $root.Identity.ChannelChain();
            if (object.channelId != null)
                if (typeof object.channelId === "string")
                    $util.base64.decode(object.channelId, message.channelId = $util.newBuffer($util.base64.length(object.channelId)), 0);
                else if (object.channelId.length)
                    message.channelId = object.channelId;
            if (object.links) {
                if (!Array.isArray(object.links))
                    throw TypeError(".Identity.ChannelChain.links: array expected");
                message.links = [];
                for (let i = 0; i < object.links.length; ++i) {
                    if (typeof object.links[i] !== "object")
                        throw TypeError(".Identity.ChannelChain.links: object expected");
                    message.links[i] = $root.Link.fromObject(object.links[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a ChannelChain message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Identity.ChannelChain
         * @static
         * @param {Identity.ChannelChain} message ChannelChain
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ChannelChain.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.links = [];
            if (options.defaults)
                if (options.bytes === String)
                    object.channelId = "";
                else {
                    object.channelId = [];
                    if (options.bytes !== Array)
                        object.channelId = $util.newBuffer(object.channelId);
                }
            if (message.channelId != null && message.hasOwnProperty("channelId"))
                object.channelId = options.bytes === String ? $util.base64.encode(message.channelId, 0, message.channelId.length) : options.bytes === Array ? Array.prototype.slice.call(message.channelId) : message.channelId;
            if (message.links && message.links.length) {
                object.links = [];
                for (let j = 0; j < message.links.length; ++j)
                    object.links[j] = $root.Link.toObject(message.links[j], options);
            }
            return object;
        };

        /**
         * Converts this ChannelChain to JSON.
         * @function toJSON
         * @memberof Identity.ChannelChain
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ChannelChain.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ChannelChain;
    })();

    return Identity;
})();

export const Channel = $root.Channel = (() => {

    /**
     * Properties of a Channel.
     * @exports IChannel
     * @interface IChannel
     * @property {Uint8Array|null} [publicKey] Channel publicKey
     * @property {string|null} [name] Channel name
     * @property {boolean|null} [isFeed] Channel isFeed
     * @property {string|null} [metadata] Channel metadata
     */

    /**
     * Constructs a new Channel.
     * @exports Channel
     * @classdesc Represents a Channel.
     * @implements IChannel
     * @constructor
     * @param {IChannel=} [properties] Properties to set
     */
    function Channel(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Channel publicKey.
     * @member {Uint8Array} publicKey
     * @memberof Channel
     * @instance
     */
    Channel.prototype.publicKey = $util.newBuffer([]);

    /**
     * Channel name.
     * @member {string} name
     * @memberof Channel
     * @instance
     */
    Channel.prototype.name = "";

    /**
     * Channel isFeed.
     * @member {boolean} isFeed
     * @memberof Channel
     * @instance
     */
    Channel.prototype.isFeed = false;

    /**
     * Channel metadata.
     * @member {string} metadata
     * @memberof Channel
     * @instance
     */
    Channel.prototype.metadata = "";

    /**
     * Creates a new Channel instance using the specified properties.
     * @function create
     * @memberof Channel
     * @static
     * @param {IChannel=} [properties] Properties to set
     * @returns {Channel} Channel instance
     */
    Channel.create = function create(properties) {
        return new Channel(properties);
    };

    /**
     * Encodes the specified Channel message. Does not implicitly {@link Channel.verify|verify} messages.
     * @function encode
     * @memberof Channel
     * @static
     * @param {IChannel} message Channel message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Channel.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.publicKey != null && message.hasOwnProperty("publicKey"))
            writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.publicKey);
        if (message.name != null && message.hasOwnProperty("name"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
        if (message.isFeed != null && message.hasOwnProperty("isFeed"))
            writer.uint32(/* id 3, wireType 0 =*/24).bool(message.isFeed);
        if (message.metadata != null && message.hasOwnProperty("metadata"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.metadata);
        return writer;
    };

    /**
     * Encodes the specified Channel message, length delimited. Does not implicitly {@link Channel.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Channel
     * @static
     * @param {IChannel} message Channel message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Channel.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Channel message from the specified reader or buffer.
     * @function decode
     * @memberof Channel
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Channel} Channel
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Channel.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Channel();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.publicKey = reader.bytes();
                break;
            case 2:
                message.name = reader.string();
                break;
            case 3:
                message.isFeed = reader.bool();
                break;
            case 4:
                message.metadata = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Channel message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Channel
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Channel} Channel
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Channel.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Channel message.
     * @function verify
     * @memberof Channel
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Channel.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.publicKey != null && message.hasOwnProperty("publicKey"))
            if (!(message.publicKey && typeof message.publicKey.length === "number" || $util.isString(message.publicKey)))
                return "publicKey: buffer expected";
        if (message.name != null && message.hasOwnProperty("name"))
            if (!$util.isString(message.name))
                return "name: string expected";
        if (message.isFeed != null && message.hasOwnProperty("isFeed"))
            if (typeof message.isFeed !== "boolean")
                return "isFeed: boolean expected";
        if (message.metadata != null && message.hasOwnProperty("metadata"))
            if (!$util.isString(message.metadata))
                return "metadata: string expected";
        return null;
    };

    /**
     * Creates a Channel message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Channel
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Channel} Channel
     */
    Channel.fromObject = function fromObject(object) {
        if (object instanceof $root.Channel)
            return object;
        let message = new $root.Channel();
        if (object.publicKey != null)
            if (typeof object.publicKey === "string")
                $util.base64.decode(object.publicKey, message.publicKey = $util.newBuffer($util.base64.length(object.publicKey)), 0);
            else if (object.publicKey.length)
                message.publicKey = object.publicKey;
        if (object.name != null)
            message.name = String(object.name);
        if (object.isFeed != null)
            message.isFeed = Boolean(object.isFeed);
        if (object.metadata != null)
            message.metadata = String(object.metadata);
        return message;
    };

    /**
     * Creates a plain object from a Channel message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Channel
     * @static
     * @param {Channel} message Channel
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Channel.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            if (options.bytes === String)
                object.publicKey = "";
            else {
                object.publicKey = [];
                if (options.bytes !== Array)
                    object.publicKey = $util.newBuffer(object.publicKey);
            }
            object.name = "";
            object.isFeed = false;
            object.metadata = "";
        }
        if (message.publicKey != null && message.hasOwnProperty("publicKey"))
            object.publicKey = options.bytes === String ? $util.base64.encode(message.publicKey, 0, message.publicKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.publicKey) : message.publicKey;
        if (message.name != null && message.hasOwnProperty("name"))
            object.name = message.name;
        if (message.isFeed != null && message.hasOwnProperty("isFeed"))
            object.isFeed = message.isFeed;
        if (message.metadata != null && message.hasOwnProperty("metadata"))
            object.metadata = message.metadata;
        return object;
    };

    /**
     * Converts this Channel to JSON.
     * @function toJSON
     * @memberof Channel
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Channel.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Channel;
})();

export { $root as default };
