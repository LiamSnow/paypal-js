import type { CreateOrderRequestBody } from "../apis/orders";

type UnknownObject = Record<string, unknown>;

type HostedFieldsCardTypes = {
    [key in
        | "amex"
        | "discover"
        | "elo"
        | "hiper"
        | "jcb"
        | "mastercard"
        | "visa"]: { eligible: boolean; valuable: boolean };
};

type HostedFieldsCardState = {
    fields: {
        [key in
            | "number"
            | "cvv"
            | "expirationDate"
            | "expirationMonth"
            | "expirationYear"
            | "postalCode"]?: {
            container: HTMLElement;
            isEmpty: boolean;
            isFocused: boolean;
            isPotentiallyValid: boolean;
            isValid: boolean;
        };
    };
    cards: {
        type: string;
        niceType: string;
        lengths: number[];
        gaps: number[];
        code: {
            name: string;
            size: number;
        };
    }[];
};

type HostedFieldsTokenize = {
    vault?: boolean;
    authenticationInsight?: unknown;
    fieldsToTokenize?: string[];
    cardholderName?: string;
    billingAddress?: {
        postalCode?: string;
        firstName?: string;
        lastName?: string;
        company?: string;
        streetAddress?: string;
        extendedAddress?: string;
        locality?: string;
        region?: string;
        countryCodeNumeric?: string;
        countryCodeAlpha2?: string;
        countryCodeAlpha3?: string;
        countryName?: string;
    };
};

export type CreateOrderActions = {
    order: {
        create: (options: CreateOrderRequestBody) => Promise<string>;
    };
};

export interface PayPalHostedFieldsComponentOptions {
    createOrder: () => Promise<string>;
    onError?: (err: UnknownObject) => void;
    styles?: UnknownObject;
    fields?: UnknownObject;
}

export interface HostedFieldsSubmitResponse {
    orderId: string;
    liabilityShift?: string;
    liabilityShifted?: boolean;
    authenticationReason?: string;
    authenticationStatus?: string;
    card: {
        brand: string;
        card_type: string;
        last_digits: string;
        type: string;
    };
}

export interface HostedFieldsHandler {
    /**
     * Add a class to a field. Useful for updating field styles when events occur elsewhere in your checkout.
     */
    addClass: (field: string, className: string) => Promise<void>;
    /**
     * Clear the value of a field.
     */
    clear: (field: string) => Promise<void>;
    /**
     * Programmatically focus a field.
     */
    focus: (field: string) => Promise<void>;
    /**
     * Get supported card types configured in the Braintree Control Panel.
     */
    getCardTypes: () => HostedFieldsCardTypes;
    /**
     * Get the state of all the rendered fields.
     */
    getState: () => HostedFieldsCardState;
    /**
     * Removes a supported attribute from a field.
     */
    removeAttribute: (options: {
        field: string;
        attribute: string;
    }) => Promise<void>;
    /**
     * Removes a class to a field. Useful for updating field styles when events occur elsewhere in your checkout.
     */
    removeClass: (options: {
        field: string;
        className: string;
    }) => Promise<void>;
    /**
     * Sets an attribute of a field. Supported attributes are aria-invalid,
     * aria-required, disabled, and placeholder.
     */
    setAttribute: (options: {
        field: string;
        attribute: string;
        value: string;
    }) => Promise<void>;
    /**
     * Sets a visually hidden message (for screen readers) on a field.
     */
    setMessage: (options: { field: string; attribute: string }) => void;
    /**
     * Sets the month options for the expiration month field when presented as a select element.
     */
    setMonthOptions: (options: unknown) => Promise<void>;
    /**
     * Sets the placeholder from a field.
     */
    setPlaceholder: (field: string, placeholder: string) => Promise<void>;
    /**
     * Submit the form if is valid
     */
    submit: (options?: UnknownObject) => Promise<HostedFieldsSubmitResponse>;
    /**
     * Clean all the fields from the DOM
     */
    teardown: () => Promise<void>;
    /**
     * Tokenize fields and returns a nonce payload.
     */
    tokenize: (
        options: HostedFieldsTokenize
    ) => Promise<Record<string, unknown>>;
}

export interface PayPalHostedFieldsComponent {
    isEligible: () => boolean;
    render: (
        options: PayPalHostedFieldsComponentOptions
    ) => Promise<HostedFieldsHandler>;
}
